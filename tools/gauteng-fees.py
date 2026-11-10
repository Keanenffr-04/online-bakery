#!/usr/bin/env python3
"""v10.26.11: works out the delivery fee for every Gauteng area from the bakery (Gerhardsville, western Centurion).

HOW: straight-line distance from the bakery to the middle of each area x a road factor (1.3) = estimated driving km,
then the fee BAND for that distance (see BANDS). These are ESTIMATES: the coordinates are approximate area centres
(good to about 2-4 km) and the bands are wide on purpose. Real courier quotes (guide 5h in roadmap/ROADMAP.md) should replace them.

USE:  python3 tools/gauteng-fees.py            prints the table (changes nothing)
      python3 tools/gauteng-fees.py --write    rewrites GAUTENG in src/js/store.js, config/site-settings.json and src/js/offline-data.js
To recalibrate: edit BANDS / ROAD_FACTOR / BAKERY below (or a single area's coordinates) and run with --write.
The owner's street address is deliberately NOT here; BAKERY is only the middle of the suburb.
"""
import json, math, re, sys, os

BAKERY = (-25.835, 28.085)            # approximate middle of Gerhardsville, western Centurion (NOT a street address)
ROAD_FACTOR = 1.3                      # driving km is about 1.3 x straight line
BANDS = [(10, 90), (20, 130), (35, 180), (50, 240), (70, 310), (100, 420)]   # (up to km, fee in rand)
PER_KM_BEYOND = 6                      # beyond the last band: the last fee + R6 for every extra km (about the Uber Connect slope), rounded to R10; never 0

REGIONS = {
 "Johannesburg": {"Alexandra": (-26.1000, 28.0970), "Bryanston": (-26.0510, 28.0200), "Braamfontein": (-26.1930, 28.0340), "Cresta": (-26.1370, 27.9770), "Dainfern": (-25.9930, 28.0130), "Diepkloof": (-26.2500, 27.9500), "Douglasdale": (-26.0150, 28.0010), "Eldorado Park": (-26.3050, 27.9300), "Emmarentia": (-26.1500, 28.0030), "Florida": (-26.1800, 27.9250), "Fourways": (-26.0140, 28.0100), "Greenside": (-26.1400, 28.0100), "Honeydew": (-26.0900, 27.9250), "Houghton": (-26.1700, 28.0530), "Johannesburg CBD": (-26.2041, 28.0473), "Johannesburg South": (-26.2700, 28.0600), "Kensington": (-26.2000, 28.0950), "Lenasia": (-26.3200, 27.8300), "Linden": (-26.1350, 27.9900), "Lonehill": (-26.0100, 28.0300), "Maboneng": (-26.2050, 28.0600), "Marlboro": (-26.0900, 28.1050), "Melrose": (-26.1350, 28.0600), "Melville": (-26.1750, 28.0000), "Midrand": (-25.9990, 28.1260), "Mondeor": (-26.2700, 28.0200), "Morningside": (-26.0950, 28.0600), "Northcliff": (-26.1450, 27.9650), "Northriding": (-26.0500, 27.9500), "Orlando": (-26.2400, 27.9100), "Parkhurst": (-26.1450, 28.0150), "Parktown": (-26.1800, 28.0400), "Paulshof": (-26.0230, 28.0600), "Randburg": (-26.0940, 28.0000), "Rivonia": (-26.0600, 28.0650), "Roodepoort": (-26.1625, 27.8725), "Rosebank": (-26.1450, 28.0430), "Rosettenville": (-26.2500, 28.0700), "Sandton": (-26.1076, 28.0567), "Soweto": (-26.2485, 27.8540), "Sunninghill": (-26.0300, 28.0600), "Waterfall": (-25.9700, 28.1100), "Wendywood": (-26.0600, 28.0850), "Woodmead": (-26.0500, 28.0900)},
 "Tshwane": {"Akasia": (-25.6500, 28.1000), "Arcadia": (-25.7450, 28.2050), "Atteridgeville": (-25.7700, 28.0800), "Brooklyn": (-25.7660, 28.2400), "Centurion": (-25.8603, 28.1894), "Cullinan": (-25.6700, 28.5150), "Eldoraigne": (-25.8200, 28.1400), "Equestria": (-25.7500, 28.3300), "Erasmuskloof": (-25.7900, 28.2900), "Faerie Glen": (-25.7900, 28.3000), "Garsfontein": (-25.7600, 28.3100), "Hammanskraal": (-25.4000, 28.2800), "Hatfield": (-25.7500, 28.2350), "Highveld": (-25.8850, 28.1000), "Irene": (-25.8900, 28.2150), "Laudium": (-25.8000, 28.1100), "Lynnwood": (-25.7600, 28.2800), "Mamelodi": (-25.7100, 28.3900), "Menlyn": (-25.7850, 28.2750), "Montana": (-25.6800, 28.2400), "Moreleta Park": (-25.8000, 28.3000), "Olievenhoutbosch": (-25.9100, 28.1600), "Pretoria CBD": (-25.7479, 28.2293), "Pretoria East": (-25.7800, 28.3300), "Pretoria North": (-25.6800, 28.1700), "Pretoria West": (-25.7600, 28.1600), "Rayton": (-25.7400, 28.5300), "Rooihuiskraal": (-25.8800, 28.1400), "Silverton": (-25.7300, 28.3000), "Soshanguve": (-25.4800, 28.1000), "Sunnyside": (-25.7550, 28.2100), "Waterkloof": (-25.7800, 28.2300), "Wierda Park": (-25.8700, 28.1700), "Wonderboom": (-25.6700, 28.2000)},
 "Ekurhuleni": {"Alberton": (-26.2670, 28.1220), "Bedfordview": (-26.1800, 28.1300), "Benoni": (-26.1880, 28.3200), "Boksburg": (-26.2120, 28.2590), "Brakpan": (-26.2370, 28.3700), "Daveyton": (-26.1500, 28.4000), "Duduza": (-26.3500, 28.4800), "Edenvale": (-26.1400, 28.1500), "Germiston": (-26.2170, 28.1670), "Isando": (-26.1400, 28.2000), "Katlehong": (-26.3350, 28.1500), "Kempton Park": (-26.1000, 28.2300), "Modderfontein": (-26.0700, 28.1500), "Nigel": (-26.4300, 28.4800), "OR Tambo Airport": (-26.1360, 28.2420), "Primrose": (-26.1800, 28.1700), "Springs": (-26.2500, 28.4400), "Tembisa": (-25.9990, 28.2260), "Thokoza": (-26.3600, 28.1500), "Vosloorus": (-26.3600, 28.2000)},
 "West Rand": {"Bekkersdal": (-26.3500, 27.6700), "Carletonville": (-26.3600, 27.4000), "Cradle of Humankind": (-25.9500, 27.8000), "Fochville": (-26.4800, 27.4900), "Kagiso": (-26.1500, 27.7900), "Krugersdorp": (-26.1000, 27.7700), "Magaliesburg": (-26.0100, 27.5400), "Muldersdrift": (-26.0100, 27.8600), "Randfontein": (-26.1850, 27.7000), "Westonaria": (-26.3200, 27.6500)},
 "Sedibeng": {"Eikenhof": (-26.4600, 27.9800), "Evaton": (-26.5300, 27.8600), "Heidelberg": (-26.5000, 28.3600), "Henley on Klip": (-26.5200, 28.1200), "Meyerton": (-26.5600, 28.0200), "Sebokeng": (-26.5800, 27.8400), "Sharpeville": (-26.6800, 27.8700), "Vanderbijlpark": (-26.7000, 27.8100), "Vereeniging": (-26.6700, 27.9300), "Walkerville": (-26.4000, 28.0100)},
}

def km(a, b):
    r = 6371.0; p1, p2 = math.radians(a[0]), math.radians(b[0]); dl = math.radians(b[1] - a[1]); dp = p2 - p1
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))

def fee_for(road_km):
    for top, fee in BANDS:
        if road_km <= top: return fee
    return int(round((BANDS[-1][1] + (road_km - BANDS[-1][0]) * PER_KM_BEYOND) / 10.0)) * 10

def build():
    out = []
    for region, areas in REGIONS.items():
        rows = []
        for name in sorted(areas):
            rk = km(BAKERY, areas[name]) * ROAD_FACTOR
            rows.append((name, fee_for(rk), round(rk)))
        out.append((region, rows))
    return out

def main():
    data = build(); flat = [r for _, rows in data for r in rows]
    assert len(flat) == 118 and len({r[0].lower() for r in flat}) == 118
    if "--write" not in sys.argv:
        for region, rows in data:
            print("\n" + region)
            for n, f, k in rows: print("  %-24s ~%3d km  R%d" % (n, k, f))
        fees = sorted({r[1] for r in flat}); print("\nfees used:", fees, "| cheapest R%d, dearest R%d" % (min(fees), max(fees)))
        return
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    js = json.dumps([{"region": rg, "areas": [[n, f] for n, f, _ in rows]} for rg, rows in data], ensure_ascii=False)
    p = os.path.join(root, "src/js/store.js"); s = open(p, encoding="utf-8").read()
    s2, n = re.subn(r"  const GAUTENG = .*?\.flatMap\(g => g\.areas\.map\([^\n]*\)\)\);\n",
        lambda m: "  const GAUTENG = " + js + ".flatMap(g => g.areas.map(([name, fee]) => ({ name, fee, region: g.region })));\n", s, count=1, flags=re.S)
    assert n == 1; open(p, "w", encoding="utf-8").write(s2)
    areas = [{"name": n, "fee": f, "region": rg} for rg, rows in data for n, f, _ in rows]
    p = os.path.join(root, "config/site-settings.json"); d = json.load(open(p, encoding="utf-8")); d["delivery"]["areas"] = areas
    open(p, "w", encoding="utf-8").write(json.dumps(d, indent=2, ensure_ascii=False) + "\n")
    p = os.path.join(root, "src/js/offline-data.js"); o = open(p, encoding="utf-8").read(); head = o[:o.index("window.SB_OFFLINE")]
    rd = lambda q: json.load(open(os.path.join(root, q), encoding="utf-8"))
    open(p, "w", encoding="utf-8").write(head + "window.SB_OFFLINE = " + json.dumps({"business": rd("config/business.json"), "settings": rd("config/site-settings.json"), "products": rd("src/data/products.json")}, indent=2, ensure_ascii=False) + ";\n")
    print("written: store.js, site-settings.json, offline-data.js (118 areas)")

main()

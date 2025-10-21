from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.question import question_list

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}

@app.get("/question")
async def get_question():
    return {"question": question_list} 

@app.post("/calculate_answer")
async def calculate_answer(request: Request):

    ans = await request.json()

    # P1 => Tungro
    # P2 => Bercak Daun
    # P3 => Blas
    # P4 => Hawar Daun Jingga 
    # P5 => Bercak Jamur

    rules = {
        "R1" : {"P1": 1, "P2":-1, "P3":-1, "P4":-1, "P5":-1},
        "R2" : {"P1": 1, "P2":-1, "P3":-1, "P4":-1, "P5":-1},
        "R3" : {"P1": 1, "P2":-1, "P3":-1, "P4":-1, "P5":-1},
        "R4" : {"P1": 1, "P2":-1, "P3":-1, "P4":-1, "P5":-1},
        "R5" : {"P1": 1, "P2":-1, "P3":-1, "P4":-1, "P5":-1},
        "R6" : {"P1":-1, "P2": 1, "P3": 0, "P4":-1, "P5": 0},
        "R7" : {"P1":-1, "P2": 1, "P3": 1, "P4":-1, "P5":-1},
        "R8" : {"P1":-1, "P2": 1, "P3": 1, "P4":-1, "P5": 0},
        "R9" : {"P1":-1, "P2": 1, "P3": 1, "P4":-1, "P5":-1},
        "R10": {"P1":-1, "P2":-1, "P3":-1, "P4": 1, "P5":-1},
        "R11": {"P1":-1, "P2":-1, "P3":-1, "P4": 1, "P5":-1},
        "R12": {"P1":-1, "P2":-1, "P3":-1, "P4": 1, "P5":-1},
        "R13": {"P1":-1, "P2":-1, "P3": 0, "P4":-1, "P5": 1},
        "R14": {"P1":-1, "P2":-1, "P3":-1, "P4":-1, "P5": 1},
        "R15": {"P1": 0, "P2": 0, "P3": 1, "P4": 0, "P5": 1},
    }

    saran = {
        "P1" : { "Gunakan varietas tahan tungro.","Kendalikan wereng hijau (penyebar virus).","Tanam serempak untuk menekan populasi vektor." },
        "P2" : { "Gunakan benih bebas jamur.","Lakukan rotasi tanam (hindari padi terus-menerus).","Keringkan lahan sementara bila terlalu lembap."},
        "P3" : { "Hindari pemupukan N berlebih (urea).","Gunakan varietas tahan blas.","Kurangi kelembapan (atur jarak tanam, drainase)."},
        "P4" : { "Pilih lokasi atau waktu tanam yang kurang mendukung perkembangan penyakit (tidak terlalu lembap/panas).","Rotasi varietas untuk mencegah adaptasi patogen." },
        "P5" : { "Simpan benih dalam kondisi kering.","Hindari kelembapan tinggi dan genangan air.","Bersihkan sisa jerami atau daun sakit setelah panen."},
    }

    penyakits = ["P1", "P2", "P3", "P4", "P5"]
    scores = { p:0 for p in penyakits }

    for item in ans:
        id = "R" + str(item["id"])
        value = item["value"]
        for penyakit in penyakits:
            if id in rules and rules[id][penyakit] == 1 and value == 1:
                scores[penyakit] += 1

    counts = {p: sum(1 for r in rules.values() if r[p] == 1) for p in penyakits}
    scores_normalized = {p: scores[p] / counts[p] if counts[p] else 0 for p in penyakits}

    max_score = max(scores_normalized.values()) if scores_normalized else 0
    most_likely = [d for d, s in scores_normalized.items() if s == max_score]
    saran_out = [saran[p] for p in most_likely]

    print(scores)

    return {
        "most_likely": most_likely,
        "max_score": max_score,
        "saran": saran_out 
    }

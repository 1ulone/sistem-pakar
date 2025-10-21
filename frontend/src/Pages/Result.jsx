import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

export default function Result() {
    const location = useLocation();
    const answer = location.state;
    const [result, setResult] = useState({
        max_score:0,
        most_likely: [],
        saran_out: {},
    });

    const penyakit = { P1:"Tungro", P2:"Bercak Daun", P3:"Blas", P4:"Hawar Daun", P5:"Bercak Jamur" }
    const [hide, setHide] = useState([ true, true, true, true, true ]);
    
    useEffect(()=> {
        async function fetchData() {
            try {
                console.log(answer);
                const f = await fetch(`${url}/calculate_answer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(answer),
                });
                const res = await f.json();
                console.log(res);
                setResult({
                    max_score:res.max_score,
                    most_likely:res.most_likely,
                    saran_out: res.saran,
                });
            } catch (err) {
                console.error("Error:", err);
            }
        }
        fetchData();
    }, [answer])

    return (
        <div className="flex regular-font">
            <div className="mx-auto bg-white/50 pt-8 pb-20 px-20 mt-36 rounded-lg text-2xl backdrop-blur-xl border-2 border-white w-1/2 mb-12">
                {result.most_likely.length == 0 ? (
                    <div className="my-8 text-white">
                        <p>Tanaman Padi anda tidak memiliki gejala apa pun</p>
                    </div>
                ) : (
                    <div className="my-8 text-white text-shadow-md italic">
                        <p>Tanaman Padi anda <br/> Memiliki Gejala {result.most_likely.length > 1 ? "Berikut" : ""}</p>
                        {result.most_likely.map((m, i) => (
                            <>
                                <p key={i} className="text-red-500 font-bold text-3xl my-2"> {penyakit[m]}</p>
                                <div className="flex flex-col gap-2 font-bold text-shadow-md bg-gray-800/20 backdrop-blur-xl p-1 rounded-xl relative shadow-md border-2 border-white text-xl">
                                    <button className="flex w-full my-2 text-white justify-between rounded-lg p-1 hover:bg-gray-800/50 duration-200 ease-in-out"
                                        onClick={()=> {
                                            const newHide = [...hide];
                                            newHide[i] = !newHide[i];
                                            setHide(newHide);
                                        }}
                                    >
                                        <p>Saran</p>
                                        <p className="not-italic">{hide[i]==true? "▶" : "▼"}</p>
                                    </button>
                                    {hide[i]==false && ( 
                                        <div key={i} className="flex flex-col gap-2 text-white ">
                                            {result.saran_out[i].map((r, i) => (
                                                <p key={i}>{r}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                )}
                <Link to="/" className="bg-red-500 py-4 px-16 hover:bg-red-800 hover:text-white duration-200 ease-in-out mt-12 mx-auto w-fit rounded-full text-red-900 disabled:bg-gray-800 disabled:text-gray-500 font-bold">Coba Lagi</Link>
            </div>
        </div>
    )
}

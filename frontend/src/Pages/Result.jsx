import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

export default function Result() {
    const location = useLocation();
    const answer = location.state;
    const [result, setResult] = useState({
        max_score:0,
        most_likely: [],
        scores: {},
    });

    const penyakit = { P1:"Tungro", P2:"Bercak Daun", P3:"Blas", P4:"Hawar Daun", P5:"Bercak Jamur" }
    
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
                    scores:res.scores,
                });
            } catch (err) {
                console.error("Error:", err);
            }
        }
        fetchData();
    }, [answer])

    return (
        <div className="flex regular-font">
            <div className="mx-auto bg-white pt-8 pb-20 px-20 mt-36 rounded-lg text-2xl">
                {result.most_likely.length == 0 ? (
                    <div className="my-8">
                        <p>Tanaman Padi anda tidak memiliki gejala apa pun</p>
                    </div>
                ) : (
                    <div className="my-8">
                        <p>Tanaman Padi anda <br/> Memiliki Gejala {result.most_likely.length > 1 ? "Berikut" : ""}</p>
                        {result.most_likely.map((m, i) => (
                            <p key={i} className="text-red-500 font-bold"> {penyakit[m]}</p>
                        ))}
                    </div>
                )}
                <Link to="/" className="bg-green-500 hover:bg-green-800 hover:text-white p-4 rounded-lg duration-200 ease-in-out">Coba Lagi</Link>
            </div>
        </div>
    )
}

import { Link, useNavigate } from "react-router-dom";
import MainInput from "../Components/MainInput";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

export default function Prompt() {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const defaultOption = [
        { tag:"Iya", value:1 },
        { tag:"Tidak", value:-1 },
        { tag:"Kurang Yakin", value:0 }
    ];

    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([
        { id:1, value:-2 },
        { id:2, value:-2 },
        { id:3, value:-2 },
        { id:4, value:-2 },
        { id:5, value:-2 },
        { id:6, value:-2 },
        { id:7, value:-2 },
        { id:8, value:-2 },
        { id:9, value:-2 },
        { id:10, value:-2 },
        { id:11, value:-2 },
        { id:12, value:-2 },
        { id:13, value:-2 },
        { id:14, value:-2 },
        { id:15, value:-2 },
    ]);

    useEffect(()=> {
        fetch(`${url}/question`)
        .then(res => res.json())
        .then(data => setQuestion(data.question));
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        navigate("/result", { state : answer })
    }

    const handleChange = (e, i) => {
        const newAnswer = [...answer];

        newAnswer[i] = {
            ...newAnswer[i], 
            value: parseInt(e.target.value, 2)
        }

        console.log(newAnswer);
        setAnswer(newAnswer);
    }

    useEffect(() => {
        if (page === 1) {
            const targetElement = document.getElementById("form");
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // adjust offset if you want a little space
                    behavior: "smooth",
                });
            }
        }
    }, [page]);

    return (
        <div className="flex flex-col relative regular-font">
                <>
                    <div className="p-12 mt-36 mx-auto text-yellow-400 z-10">
                        <p className="text-9xl/[6rem] title-font text-shadow-md">Sistem Bantu Diagnosis Penyakit Tanaman Padi.</p>
                        <button 
                            className="p-4 w-full hover:bg-yellow-400 hover:text-white duration-300 ease-in-out -mt-1 rounded-lg text-2xl disabled:text-white/0 text-shadow-md"
                            onClick={()=> setPage(1)}
                            disabled={page===1}
                        >mulai diagnosa</button>
                    </div>
                </>
            {page==1 && (
                <div className="bg-white mx-auto my-20 p-12 w-1/2 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} method="POST" id="form" className="flex flex-col">

                        <p className="text-2xl italic">Isi Form Diagnosa ini dengan benar</p>
                        {question.map((q, i) => (
                            <MainInput 
                                question={q}
                                radio_name={"r"+i}
                                options={defaultOption}
                                onChange={(e)=> handleChange(e, i)}
                                key={i}
                            />
                        ))}

                        <button 
                            type="submit" 
                            className="bg-green-500 p-4 hover:bg-green-800 hover:text-white duration-200 ease-in-out mx-auto w-fit rounded-lg text-white disabled:bg-gray-800 disabled:text-gray-500"
                            disabled={answer.some(item => item.value === -2)}
                        >TAMPILKAN HASIL</button>
                    </form>
                </div>
            )}
        </div>
    )
}

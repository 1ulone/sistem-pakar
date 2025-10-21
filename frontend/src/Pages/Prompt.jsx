import { useNavigate } from "react-router-dom";
import MainInput from "../Components/MainInput";
import { useEffect, useRef, useState } from "react";

const url = import.meta.env.VITE_API_URL;

export default function Prompt() {
    const [page, setPage] = useState(0);
    const [btn, setBtn] = useState(false);
    const ref = useRef();
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
            console.log(ref);
            window.scrollTo({
                top: ref.current.offsetTop + 500, // adjust offset if you want a little space
                behavior: "smooth",
            });
            setBtn(true);
        }
    }, [page]);

    return (
        <div className="flex flex-col relative regular-font">

            <>
                <div className="p-12 mt-46 mx-auto z-10 flex flex-col">
                    <p className="text-9xl/[4.5rem] title-font">
                        <span className="transparent-text">Sistem Bantu Diagnosis </span><br/> 
                        <span className="transparent-text">Penyakit Tanaman Padi.</span>
                    </p>
                    <button 
                        className=
                        {`
                            text-white w-fit py-4 px-16 my-16 mx-auto bg-white/10 backdrop-blur-xl 
                            border-2 border-white/50
                            hover:bg-white  hover:text-black
                            duration-200 ease-in-out rounded-full
                            disabled:bg-white/0 disabled:text-white/0 disabled:backdrop-blur-none disabled:border-none 
                        `}
                        onClick={()=> setPage(1)}
                        disabled={btn}
                    >mulai diagnosa</button>
                </div>
            </>

            {page==1 && (
                <div className="bg-white/50 backdrop-blur-xl mx-auto my-20 p-12 w-1/2 rounded-lg shadow-md border-2 border-white/50">
                    <form onSubmit={handleSubmit} method="POST" id="form" className="flex flex-col" ref={ref}>

                        <p className="text-2xl italic text-white text-shadow-md">Isi Form Diagnosa ini dengan benar</p>
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
                            className="bg-green-500 py-4 px-16 hover:bg-green-800 hover:text-white duration-200 ease-in-out mt-12 mx-auto w-fit rounded-full text-green-900 disabled:bg-gray-800 disabled:text-gray-500 font-bold"
                            disabled={answer.some(item => item.value === -2)}
                        >TAMPILKAN HASIL</button>
                    </form>
                </div>
            )}
        </div>
    )
}

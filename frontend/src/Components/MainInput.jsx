import { forwardRef, useRef } from "react"

export default forwardRef(function MainInput({ question, options, radio_name, onChange }, ref) {
    const input = ref ? ref : useRef();

    return (
        <div className="text-xl p-4 my-4 bg-gray-100 rounded-lg shadow-md group w-3/4 mx-auto hover:bg-gray-600 duration-200 ease-in-out hover:shadow-xl">
            <p className="my-1 italic group-hover:text-white duration-200 ease-in-out">{question}</p>
            <div className="flex gap-4" ref={input}>
                {options.map((o, i)=> (
                    <div key={i} className="text-[1rem] group-hover:text-white duration-200 ease-in-out">
                        <input type="radio" id={radio_name + o.value} name={radio_name} value={o.value} onChange={onChange} />
                        <label htmlFor={radio_name + o.value} className="pl-1">{o.tag}</label>
                    </div>
                ))}
            </div>
        </div>
    )
});

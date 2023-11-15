import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useState } from "react";
import Lottie from "react-lottie-player";
import cookerLottieJSON from "../public/cookerLottie.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [recipe, setRecipe] = useState("");
  const [dish, setDish] = useState("");
  const [isLoading, setLoading] = useState(false);

  let handleSubmit = async () => {
    try {
      setLoading(true);
      const dishRespone = await axios.post("api/chat", { dish });
      if (dishRespone.data.error) {
        throw new Error(dishRespone.data);
      }
      setRecipe(dishRespone.data.llmResponse.choices[0].message.content);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setRecipe("");
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="">
          <img src="/cookwithaiLogo.jpeg" width={140}></img>
        </div>

        <div className="mt-6 text-center">
          <h1 className="font-sans text-4xl text-blue-500">
            Hola! I am your AI chef. What do you wanna cook today?
          </h1>
        </div>

        <div className="mt-6">
          <input
            type="text"
            className="p-1 mr-2 text-3xl text-center border-b-2 border-slate-500 bg-slate-300"
            onChange={(e) => setDish(e.target.value)}
            value={dish}
          />
        </div>

        {isLoading ? null : (
          <div className="mt-6">
            <button
              className="p-2 bg-blue-400 rounded"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Let's cook
            </button>
          </div>
        )}

        {isLoading ? (
          <Lottie
            loop
            play
            animationData={cookerLottieJSON}
            className="mx-auto"
            style={{ width: 150, height: 150 }}
          />
        ) : recipe === "" ? null : (
          <div className="w-2/3 p-4 mt-6 rounded-lg border-blue-400 border-4 shadow-xl shadow-blue-400/50">
            <p style={{ whiteSpace: "pre-line" }}>{recipe}</p>
          </div>
        )}
      </div>
    </>
  );
}

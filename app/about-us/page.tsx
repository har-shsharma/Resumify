'use client'
import React from "react";
import { Vortex } from "../components/ui/Vortext";

export default function Page() {
    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center w-full h-full"
            >
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                    The hell is this?
                </h2>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                    This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
                    burned and you&apos;ll have a scar.
                </p>
                <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
                    Oh? <span className="font-semibold">Resumify?</span> We are the ones helping you turn pain into power. Every scar tells your story—let us help you write it professionally.
                </p>
                <p>

                </p>
            </Vortex>
        </div>
    );
}

"use client";

import React from "react";

const Introduction: React.FC = () => {
  return (
    <section className="w-full bg-white  py-12 md: md:py-16  mx-auto mt-10">
      <div className="space-y-6 text-gray-800">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Introduction
          </h1>
          <p className="text-lg text-gray-500">
            Create magical landing pages with components that you can copy and paste into your apps.
          </p>
        </header>

        <p>
          <span className="font-medium text-gray-700">Magic UI</span> is a collection of re-usable components that you can copy and paste into your web apps.
        </p>

        <p>
          It primarily features components, blocks, and templates geared towards creating landing pages and user-facing marketing materials.
        </p>

        <hr className="my-8 border-gray-200" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Philosophy</h2>

          <p className="font-semibold text-gray-800">
            I personally believe that good design contributes significant value to software. It&rsquo;s one of the main methods of establishing trust between you and an internet stranger.
          </p>

          <p className="text-gray-600 mt-2">
            Trust is important for internet businesses because it is the first thing a visitor evaluates before pulling out their credit card and becoming a customer.
          </p>

          <div className="mt-4">
            <p className="text-gray-700 font-medium">Some questions visitors might ask themselves are:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>&quot;Is this company legit?&quot;</li>
              <li>&quot;Who else is using it?&quot;</li>
              <li>&quot;Can I trust them with my personal data?&quot;</li>
            </ul>
          </div>

          <p className="mt-6 font-semibold text-gray-800">
            Poor design reflects poorly on your team.
            <span className="font-normal text-gray-600">
              {" "}
              It comes off as lazy, unfinished, and unstable. It shows that the team doesn&apos;t care about user experience.
            </span>
          </p>

          <p className="mt-4 font-semibold text-gray-800">
            Good design indicates that the team behind has their shit together.
            <span className="font-normal text-gray-600">
              {" "}
              I can probably expect good things from them in the future.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;

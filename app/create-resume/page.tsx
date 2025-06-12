'use client';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Block {
  subheading: string;
  date: string;
  content: string;
  bullets: string[];
}

interface Section {
  id: string;
  heading: string;
  alignment: 'left' | 'center';
  headingAlignment: 'left' | 'center';
  blocks: Block[];
}

function Page() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: uuidv4(),
      heading: '',
      alignment: 'left',
      headingAlignment: 'left',
      blocks: [
        {
          subheading: '',
          date: '',
          content: '',
          bullets: [''],
        },
      ],
    },
  ]);

  const addBlockToSection = (sectionIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].blocks.push({
      subheading: '',
      date: '',
      content: '',
      bullets: [''],
    });
    setSections(updated);
  };

  const handleBlockChange = (
    sectionIndex: number,
    blockIndex: number,
    field: string,
    value: string
  ) => {
    const updated = [...sections];
    const block = updated[sectionIndex].blocks[blockIndex];
    if (field === 'subheading' || field === 'date' || field === 'content') {
      block[field] = value;
    }
    setSections(updated);
  };

  const handleBulletChange = (
    sectionIndex: number,
    blockIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...sections];
    updated[sectionIndex].blocks[blockIndex].bullets[bulletIndex] = value;
    setSections(updated);
  };

  const addBullet = (sectionIndex: number, blockIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].blocks[blockIndex].bullets.push('');
    setSections(updated);
  };



  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const updated = [...sections];

    if (field === 'heading' || field === 'alignment' || field === 'headingAlignment') {
      updated[index] = {
        ...updated[index],
        [field]: value as Section[typeof field],
      };
    }

    setSections(updated);
  };



  const addSection = () => {
    setSections([
      ...sections,
      {
        id: uuidv4(),
        heading: '',
        alignment: 'left',
        headingAlignment: 'left',
        blocks: [
          {
            subheading: '',
            date: '',
            content: '',
            bullets: [''],
          },
        ],
      },
    ]);
  };

  const removeSection = (index: number) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };


  const removeBlockFromSection = (sectionIndex: number, blockIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].blocks.splice(blockIndex, 1);
    setSections(updated);
  };


  const handleDownload = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };


  return (
    <div className="bg-[#000619] min-h-screen pt-[120px] px-6 text-white pb-20">
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* FORM SIDE */}
        <div className="flex-1 space-y-8 md:max-h-[85vh] overflow-y-auto scrollbar-width-none">
          <h2 className="text-2xl font-semibold">Build Your Resume</h2>

          {sections.map((section, i) => (
            <div key={section.id} className="bg-white/5 p-4 rounded-md space-y-4">
              <input
                type="text"
                placeholder="Section Heading (e.g. Experience)"
                value={section.heading}
                onChange={(e) => handleSectionChange(i, 'heading', e.target.value)}
                className="w-full p-2 rounded bg-white/10 text-white placeholder:text-white/40 outline-none"
              />

              <div className="flex items-center gap-4">
                <label className="text-white/70 text-sm">Heading Align:</label>
                <select
                  value={section.headingAlignment}
                  onChange={(e) => handleSectionChange(i, 'headingAlignment', e.target.value)}
                  className="bg-white/10 text-white p-1 rounded text-sm"
                >
                  <option value="left" className="text-black">Left</option>
                  <option value="center" className="text-black">Center</option>
                </select>
              </div>

              {section.blocks.map((block, j) => (
                <div key={j} className="space-y-2 border border-white/10 p-3 rounded">
                  <textarea
                    placeholder="Subheading (e.g. Google Inc.)"
                    value={block.subheading}
                    onChange={(e) => handleBlockChange(i, j, 'subheading', e.target.value)}
                    className="w-full p-2 rounded bg-white/10 text-white placeholder:text-white/40 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g. 2022 - Present)"
                    value={block.date}
                    onChange={(e) => handleBlockChange(i, j, 'date', e.target.value)}
                    className="w-full p-2 rounded bg-white/10 text-white placeholder:text-white/40 outline-none"
                  />
                  <textarea
                    placeholder="Description"
                    value={block.content}
                    onChange={(e) => handleBlockChange(i, j, 'content', e.target.value)}
                    className="w-full p-2 rounded bg-white/10 text-white placeholder:text-white/40 outline-none"
                  />
                  {block.bullets.map((b, k) => (
                    <input
                      key={k}
                      type="text"
                      placeholder={`Bullet ${k + 1}`}
                      value={b}
                      onChange={(e) => handleBulletChange(i, j, k, e.target.value)}
                      className="w-full mb-1 p-2 rounded bg-white/10 text-white placeholder:text-white/40 outline-none"
                    />
                  ))}
                  <div className='flex justify-between'>
                    <button
                      onClick={() => addBullet(i, j)}
                      className="text-sm mt-1 text-cyan-400 hover:underline"
                    >
                      + Add Bullet
                    </button>

                    <button
                      onClick={() => removeBlockFromSection(i, j)}
                      className="text-sm text-red-500 hover:underline ml-2"
                    >
                      Remove Sub Section
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="text-white/70 text-sm">Text Align:</label>
                    <select
                      value={section.alignment}
                      onChange={(e) => handleSectionChange(i, 'alignment', e.target.value)}
                      className="bg-white/10 text-white p-1 rounded text-sm"
                    >
                      <option value="left" className="text-black">Left</option>
                      <option value="center" className="text-black">Center</option>
                    </select>
                  </div>



                </div>
              ))}


              <button
                onClick={() => addBlockToSection(i)}
                className="text-sm text-cyan-300 hover:underline"
              >
                + Add Sub Section
              </button>

              <button
                onClick={() => removeSection(i)}
                className="text-red-500 hover:underline text-sm ml-2"
              >
                Remove Section
              </button>



            </div>
          ))}


          <button
            onClick={addSection}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md shadow-md transition-transform duration-300 hover:scale-110"
          >
            + Add Section
          </button>

          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition-transform duration-300 ml-[18px] transition-transform duration-300 hover:scale-110"
          >
            Download PDF
          </button>
        </div>

        {/* PREVIEW SIDE */}
        <div
          id="resume-content"
          className="flex-1 bg-white text-black p-6 rounded-md space-y-6 h-fit min-h-[80vh]"

        >
          {sections.map((section, i) => (
            <div key={i} className="space-y-1 border-b pb-4">
              {section.heading && (
                <h3 className={`text-xl font-semibold text-${section.headingAlignment}`}>
                  {section.heading}
                </h3>
              )}

              {section.blocks.map((block, j) => (
                <div key={j} className="space-y-1">
                  {block.subheading && (
                    <p className={`text-md whitespace-pre-line text-${section.alignment}`}>
                      {block.subheading}
                    </p>
                  )}
                  {block.date && (
                    <p className={`text-sm italic text-${section.alignment}`}>
                      {block.date}
                    </p>
                  )}
                  {block.content && (
                    <p className={`mt-2 whitespace-pre-line text-${section.alignment}`}>
                      {block.content}
                    </p>
                  )}
                  {block.bullets.some((b) => b.trim() !== '') && (
                    <ul className={`list-disc pl-5 mt-2 text-sm text-${section.alignment}`}>
                      {block.bullets
                        .filter((b) => b.trim() !== '')
                        .map((b, k) => (
                          <li key={k} className={`text-${section.alignment}`}>{b.trim()}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}

        </div>
      </motion.div>
    </div>
  );
}

export default Page;






import Block from "../components/Block";
import { PolySynth } from "tone";
import { useState, useEffect } from "react";

const notes = ["B", "A", "G", "F", "E", "D", "C"];

const MusicGrid = () => {
  const [musicSheet, setMusicSheet] = useState<[][] | null>(null);

  const polySynth = new PolySynth().toDestination();

  useEffect(() => {
    let musicSheet = new Array(14);
    const baseScale = 5;
    for (let i = 0; i < musicSheet.length; i++) {
      const startScale = baseScale - Math.floor(i / notes.length);
      musicSheet[i] = new Array(32).fill(notes[i % notes.length] + startScale);
    }
    setMusicSheet(musicSheet);
  }, []);

  function playSynth({
    note,
    duration = "16n",
  }: {
    note: string;
    duration?: string;
  }) {
    polySynth.triggerAttackRelease(note, duration);
  }

  return musicSheet != null ? ( // Add Suspense
    <div className="absolute w-full h-[calc(100%-190px)] top-[81px] overflow-hidden">
      <div className="grid grid-cols-32 ">
        {musicSheet.map((rowItem, rowId) => {
          return rowItem.map((note, colId) => {
            return (
              <Block
                key={"" + rowId + colId}
                rowId={rowId}
                colId={colId}
                note={note}
                playNote={playSynth}
              />
            );
          });
        })}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MusicGrid;

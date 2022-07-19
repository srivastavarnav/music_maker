import Block from "../components/Block";
import { useState, useEffect } from "react";
import TouchedNotes from "../interfaces/touched.interface";

const notes = ["B", "A", "G", "F", "E", "D", "C"];

type MusicGridType = {
  currentCol: number;
  touchedNotes: TouchedNotes;
  setTouchedNotes: (notes: TouchedNotes) => void;
  instrument: any;
};

const MusicGrid = ({
  currentCol,
  touchedNotes,
  setTouchedNotes,
  instrument,
}: MusicGridType) => {
  const [musicSheet, setMusicSheet] = useState<[][] | null>(null);

  useEffect(() => {
    let musicSheet = new Array(14);
    const baseScale = 6;
    for (let i = 0; i < musicSheet.length; i++) {
      const startScale = baseScale - Math.floor(i / notes.length);
      musicSheet[i] = new Array(32).fill(notes[i % notes.length] + startScale);
    }
    setMusicSheet(musicSheet);
  }, []);

  function playAndCaptureNote({
    note,
    duration = "16n",
    colId,
  }: {
    note: string;
    duration?: string;
    colId: number;
  }) {
    setTouchedNotes(
      Object.assign({}, touchedNotes, {
        [colId]:
          touchedNotes[colId] === undefined
            ? [note]
            : [...touchedNotes[colId], note],
      })
    );
    instrument.triggerAttackRelease(note, duration);

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
                playNote={playAndCaptureNote}
                playingCol={currentCol}
              />
            );
          });
        })}
      </div>
    </div>
  ) : (
    <div className="absolute inset-0 flex justify-center items-center">Loading...</div>
  );
};

export default MusicGrid;

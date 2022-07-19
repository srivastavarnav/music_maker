import Block from "../components/Block";
import { useState, useEffect } from "react";
import TouchedNotes from "../interfaces/touched.interface";

const notes = ["B", "A", "G", "F", "E", "D", "C"];

type MusicGridType = {
  currentCol: number;
  touchedNotes: TouchedNotes;
  setTouchedNotes: ({
    note,
    colId,
    remove,
  }: {
    note: string;
    colId: number;
    remove?: boolean;
  }) => void;
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
    let musicSheet = new Array(16);
    const baseScale = 5;
    for (let i = 0; i < musicSheet.length - 2; i++) {
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
    setTouchedNotes({ note, colId });
    instrument.triggerAttackRelease(note, duration);
  }

  const removeNote = ({ note, colId }: { note: string; colId: number }) => {
    setTouchedNotes({ note, colId, remove: true });
  };

  return musicSheet != null ? ( // [@TODO: Add Suspense]
    <div className="absolute w-full top-[81px] h-[calc(100%-190px)] flex overflow-x-auto overflow-y-hidden">
      <div className="relative w-full overflow-hidden shrink-0">
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
                  removeNote={removeNote}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="absolute inset-0 flex justify-center items-center">
      Loading...
    </div>
    // [@TODO: Add a loading gif/lottie/animated loader]
  );
};

export default MusicGrid;

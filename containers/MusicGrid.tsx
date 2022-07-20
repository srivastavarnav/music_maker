import Block from "../components/Block";
import { useState, useEffect } from "react";
import { PolySynth, Player } from "tone";
import Drums from "../enums/drums.enum";
import { BAR_LENGTH, BEATS_PER_BAR, NOTES } from "../lib/constants";

type MusicGridType = {
  currentCol: number;
  setTouchedNotes: ({
    note,
    colId,
    remove,
  }: {
    note: string;
    colId: number;
    remove?: boolean;
  }) => void;
  instrument: PolySynth | null;
  snare: Player | null;
  kick: Player | null;
  setTouchedDrumNotes: ({
    note,
    colId,
    remove,
  }: {
    note: string;
    colId: number;
    remove?: boolean;
  }) => void;
  noteDuration: string;
  musicSheetRef: React.MutableRefObject<HTMLDivElement | null>;
  currentBlockRef: React.MutableRefObject<HTMLDivElement | null>;
};

const MusicGrid = ({
  currentCol,
  setTouchedNotes,
  instrument,
  kick,
  snare,
  setTouchedDrumNotes,
  noteDuration,
  musicSheetRef,
  currentBlockRef,
}: MusicGridType) => {
  const [musicSheet, setMusicSheet] = useState<[][] | null>(null);
  const [numOfSheetColumns, setNumOfSheetColumns] = useState<number>(
    BAR_LENGTH * BEATS_PER_BAR * 2
  );

  useEffect(() => {
    let musicSheet = new Array(16);
    const baseScale = 5;
    for (let i = 0; i < musicSheet.length - 2; i++) {
      const startScale = baseScale - Math.floor(i / NOTES.length);
      musicSheet[i] = new Array(32).fill(NOTES[i % NOTES.length] + startScale);
    }
    for (let i = musicSheet.length - 2; i < musicSheet.length; i++) {
      musicSheet[i] = new Array(32).fill(
        i === musicSheet.length - 2 ? Drums.SNARE : Drums.KICK
      );
    }
    setMusicSheet(musicSheet);
  }, []);

  function playAndCaptureNote({
    note,
    colId,
  }: {
    note: string;
    colId: number;
  }) {
    setTouchedNotes({ note, colId });
    instrument?.triggerAttackRelease(note, noteDuration);
  }

  const removeNote = ({ note, colId }: { note: string; colId: number }) => {
    setTouchedNotes({ note, colId, remove: true });
  };

  const removeBeats = ({ note, colId }: { note: string; colId: number }) => {
    setTouchedDrumNotes({ note, colId, remove: true });
  };

  function playAndCaptureDrumNote({
    name,
    colId,
  }: {
    name: string;
    colId: number;
  }) {
    setTouchedDrumNotes({ note: name, colId });
    if (name == Drums.KICK) {
      kick?.start();
    } else {
      snare?.start();
    }
  }

  return musicSheet != null ? ( // [@TODO: Add Suspense]
    <div
      className="absolute w-full top-[81px] h-[calc(100%-190px)] flex overflow-x-auto"
      ref={musicSheetRef}
    >
      <div className="relative w-[320%] tablet:w-[200%] lg:w-full overflow-hidden shrink-0">
        <div className="grid grid-cols-32 ">
          {musicSheet.map((rowItem, rowId) => {
            return rowItem.map((note, colId) => {
              return (
                <div
                  ref={colId == currentCol + 5 && rowId === 0 ? currentBlockRef : null}
                  key={"" + rowId + colId}
                >
                  <Block
                    rowId={rowId}
                    colId={colId}
                    note={note}
                    playAndAddNote={playAndCaptureNote}
                    playingCol={currentCol}
                    removeNote={removeNote}
                    playAndAddDrumNote={playAndCaptureDrumNote}
                    removeBeats={removeBeats}
                  />
                </div>
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

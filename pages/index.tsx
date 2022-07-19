import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import useInterval from "../hooks/useInterval";
import MusicGrid from "../containers/MusicGrid";
import TouchedNotes from "../interfaces/touched.interface";
import { PolySynth, Player } from "tone";

const Home: NextPage = () => {
  const [currentCol, setCurrentCol] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchedNotes, setTouchedNotes] = useState<TouchedNotes>({});
  const [instrument, setInstrument] = useState<PolySynth | null>(null);
  const [snare, setSnare] = useState<Player | null>(null);
  const [kick, setKick] = useState<Player | null>(null);

  useEffect(() => {
    const polySynth = new PolySynth().toDestination();
    setInstrument(polySynth);
  }, []);

  const playMusicSheet = () => {
    setCurrentCol((currentCol + 1) % 32);
    instrument?.triggerAttackRelease(
      touchedNotes[(currentCol + 1) % 32],
      "16n"
    );
  };

  const play = () => {
    setIsPlaying(true);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentCol(-1);
  };

  const setSelectedNotes = ({
    note,
    colId,
    remove = false,
  }: {
    note: string;
    colId: number;
    remove?: boolean;
  }) => {
    if (remove) {
      setTouchedNotes((notes) => {
        return Object.assign({}, notes, {
          [colId]:
            notes[colId] === undefined
              ? []
              : notes[colId].filter((n) => n != note),
        });
      });
    } else {
      setTouchedNotes((notes) => {
        return Object.assign({}, notes, {
          [colId]:
            notes[colId] === undefined ? [note] : [...notes[colId], note],
        });
      });
    }
  };

  useInterval(playMusicSheet, isPlaying ? 500 : null);

  return (
    <>
      <Head>
        <title>Music Maker</title>
        <meta name="description" content="music maker application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-20 top-0 bg-yellow-100"></div>
      <MusicGrid
        currentCol={currentCol}
        touchedNotes={touchedNotes}
        setTouchedNotes={setSelectedNotes}
        instrument={instrument}
      />
      <div className="absolute w-full h-[110px] bottom-0 border-t-[1px] border-solid border-t-gray px-6 py-4 flex items-center">
        <div
          className="cursor-pointer h-20 w-20 rounded-full bg-blue-400 hover:bg-blue-300 flex items-center justify-center"
          onClick={isPlaying ? stop : play}
        >
          {isPlaying ? (
            <FaStop color="white" size={30} />
          ) : (
            <FaPlay className="ml-1" color="white" size={30} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

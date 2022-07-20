import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import useInterval from "../hooks/useInterval";
import MusicGrid from "../containers/MusicGrid";
import TouchedNotes from "../interfaces/touched.interface";
import { PolySynth, Player } from "tone";
import Drums from "../enums/drums.enum";
import { IoMdSettings } from "react-icons/io";
import { BAR_LENGTH, BEATS_PER_BAR } from "../lib/constants";

const Home: NextPage = () => {
  const [currentCol, setCurrentCol] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchedNotes, setTouchedNotes] = useState<TouchedNotes>({});
  const [touchedDrumNotes, setTouchedDrumNotes] = useState<TouchedNotes>({});
  const [instrument, setInstrument] = useState<PolySynth | null>(null);
  const [snare, setSnare] = useState<Player | null>(null);
  const [kick, setKick] = useState<Player | null>(null);
  const [tempo, setTempo] = useState<string>("120");
  const [noteDuration, setNoteDuration] = useState<string>("8n");
  const [time, setTime] = useState<number>(250);
  const [numOfSheetColumns, setnumOfSheetColumns] = useState(
    BAR_LENGTH * BEATS_PER_BAR * 2
  );
  const musicSheetRef = useRef<HTMLDivElement | null>(null);
  const currentBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const polySynth = new PolySynth().toDestination();
    setKick(new Player("/audio/kick.mp3").toDestination());
    setSnare(new Player("/audio/snare.mp3").toDestination());
    setInstrument(polySynth);
  }, []);

  const playMusicSheet = () => {
    if ((currentCol + 1) % numOfSheetColumns === 0) {
      musicSheetRef?.current?.scrollTo({
        left: 0,
      });
    }
    setCurrentCol((currentCol + 1) % numOfSheetColumns);
    instrument?.triggerAttackRelease(
      touchedNotes[(currentCol + 1) % numOfSheetColumns],
      noteDuration
    );
    if (
      touchedDrumNotes[(currentCol + 1) % numOfSheetColumns]?.includes(
        Drums.KICK
      ) &&
      touchedDrumNotes[(currentCol + 1) % numOfSheetColumns]?.includes(
        Drums.SNARE
      )
    ) {
      kick?.start();
      snare?.start();
    } else if (
      touchedDrumNotes[(currentCol + 1) % numOfSheetColumns]?.includes(
        Drums.SNARE
      )
    ) {
      snare?.start();
    } else if (
      touchedDrumNotes[(currentCol + 1) % numOfSheetColumns]?.includes(
        Drums.KICK
      )
    ) {
      kick?.start();
    }
    if (currentBlockRef.current) {
      currentBlockRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
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

  const setSelectedDrumNotes = ({
    note,
    colId,
    remove = false,
  }: {
    note: string;
    colId: number;
    remove?: boolean;
  }) => {
    if (remove) {
      setTouchedDrumNotes((notes) => {
        return Object.assign({}, notes, {
          [colId]:
            notes[colId] === undefined
              ? []
              : notes[colId].filter((n) => n != note),
        });
      });
    } else {
      setTouchedDrumNotes((notes) => {
        return Object.assign({}, notes, {
          [colId]:
            notes[colId] === undefined ? [note] : [...notes[colId], note],
        });
      });
    }
  };

  useInterval(playMusicSheet, isPlaying ? time : null);

  const onTempoChange = (e: React.FormEvent<HTMLInputElement>) => {
    const tempo = e.currentTarget.value;
    setTempo(tempo.toString());
    const delay = Math.floor((30 / +tempo) * 1000);
    setTime(delay);
  };

  return (
    <>
      <Head>
        <title>Music Maker</title>
        <meta name="description" content="music maker application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-full h-20 top-0 flex justify-center items-center">
        <div className="text-gray-500 font-bold text-2xl">Music Maker</div>
      </div>
      <MusicGrid
        currentCol={currentCol}
        setTouchedNotes={setSelectedNotes}
        setTouchedDrumNotes={setSelectedDrumNotes}
        instrument={instrument}
        snare={snare}
        kick={kick}
        noteDuration={noteDuration}
        musicSheetRef={musicSheetRef}
        currentBlockRef={currentBlockRef}
      />
      <div className="absolute w-full h-[110px] bottom-0 border-t-[1px] border-solid border-t-gray px-6 py-4 flex items-center justify-between">
        <div
          className="cursor-pointer h-14 w-14 md:w-20 md:h-20 rounded-full bg-blue hover:bg-blue-300 flex items-center justify-center"
          onClick={isPlaying ? stop : play}
        >
          {isPlaying ? (
            <>
              <FaStop className="md:hidden" color="white" size={16} />
              <FaStop className="hidden md:block" color="white" size={30} />
            </>
          ) : (
            <>
              <FaPlay className="ml-1 md:hidden" color="white" size={16} />
              <FaPlay
                className="ml-1 hidden md:block"
                color="white"
                size={30}
              />
            </>
          )}
        </div>
        <div className="flex items-center">
          <label className="text-gray-400 mr-2 md:mr-8 text-sm md:text-lg">
            Tempo
          </label>
          <input
            id="tempo"
            type="range"
            min="40"
            max="240"
            value={tempo}
            className="w-28 md:w-80 h-2 rounded-lg cursor-pointer appearance-none bg-gray-200"
            onChange={onTempoChange}
          />
          <div className="text-blue ml-2 md:ml-8 md:w-16 text-sm md:text-base">
            {tempo}
          </div>
        </div>
        <div className="cursor-pointer lg:h-14 lg:w-14 w-10 h-10 rounded-full hover:bg-gray-200 border-gray-1 border-solid border-[0.5px] flex items-center justify-center">
          <IoMdSettings color="gray" size={24} />
        </div>
      </div>
    </>
  );
};

export default Home;

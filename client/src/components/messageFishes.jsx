import React from "react";
import "./messageFishes.css";
import { motion, scale } from "framer-motion";

export const MessageFishes = () => {
  return (
    <div className="fishes-container">
      <motion.div
        className="fishes-wrapper"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <div className="fish">
          <motion.div
            className="fish-body"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 50, left: 110 }}
          ></motion.div>
          <motion.div
            className="fish-tail"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 80, left: 60, rotate: 180 }}
          ></motion.div>
          <motion.div
            className="fish-eye"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 90, left: 210 }}
          ></motion.div>
        </div>

        <div className="fish">
          <motion.div
            className="fish-body"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 50, left: 910 }}
          ></motion.div>
          <motion.div
            className="fish-tail"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 80, left: 1050 }}
          ></motion.div>
          <motion.div
            className="fish-eye"
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: 90, left: 940 }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

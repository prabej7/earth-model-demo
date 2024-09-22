import { Position } from "@/components/Model";

export interface ModelProps {
  position?: [number, number, number];
  onClick: (position: Position) => void;
}

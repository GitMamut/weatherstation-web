import interpolate from "color-interpolate";

export const temperature = (isFetched: boolean, reading: number): string => {
    if (isFetched) {
      return "lightgray";
    } else if (reading >= 0){
      let colormap = interpolate(["aqua","lime","yellow","orange","red"]);
      return colormap(reading/40);
    } else {
      let colormap = interpolate(["aqua","blue","purple"]);
      return colormap((reading * -1)/20);
    }
  }

export const humidity = (isFetched: boolean, reading: number): string => {
    if (isFetched) {
      return "lightgray";
    } else {
      let colormap = interpolate(["white","lightblue","blue"]);
      return colormap(reading/100);
    }
  }

export const pressure = (isFetched: boolean, reading: number): string => {
    if (isFetched) {
      return "lightgray";
    } else {
      let colormap = interpolate(["purple", "darkviolet", "orchid", "violet"]);
      return colormap((reading-950)/100);
    }
  }
  
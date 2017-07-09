const breakpoints = {
  xs: {
    max: 480
  },  s: {
    min: 480,
    max: 768
  },
  m: {
    min: 768,
    max: 1024
  },
  l: {
    min: 1024,
    max: 1440
  },
  xl: {
    min: 1440
  }
};

export default (width) => {
  let result;

  for (let breakpoint in breakpoints) {
    const max = breakpoints[breakpoint].max;
    const min = breakpoints[breakpoint].min;
    if ((!max || (max && width <= max)) && (!min || (min && width > min))) {
      result = breakpoint;
      break;
    }
  }
  !result && console.warn(`Cant get breakpoint value for "${width}" width`);
  return result;
};

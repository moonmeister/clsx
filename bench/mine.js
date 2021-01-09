//original

exports.original = function classNames(...args) {
  const classes = args.reduce((acc, arg) => {
    if (!arg) return acc;

    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      acc.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) acc.push(inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) acc.push(key);
        }
      }
    }

    return acc
  }, [])

  return classes.join(' ');
}

function append(acc, arg) {
  return acc + arg + ' '
}

exports.noJoin = function classNames(...args) {
  return args.reduce((acc, arg) => {
    if (!arg) return acc;

    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      append(acc, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) append(acc, inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        append(acc, arg).toString()
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) append(acc, key);;
        }
      }
    }

    return acc
  }, '')
}


exports.noReduce = function classNames(...args) {
  let classes = ""

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        append(classes, arg.toString());
      } else {
        for (const [key, value] of Object.entries(arg)) {
          if (value) classes = append(classes, key);
        }
      }
    }
  }

  return classes
}

exports.noObjCheck = function classNames(...args) {
  let classes = ""

  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === "string" || argType === 'number') {
      classes = append(classes, arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
      if (inner) classes = append(classes, inner);
    } else if (argType === "object") {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes = append(classes, key);
      }
    }
  }

  return classes
}
import {
  Arr,
  ARRAY_OBJ,
  Builtin,
  Err,
  Integer,
  StringLit,
} from "../object/object.js";
import { NULL } from "../evaluator/evaluator.js";

function len(...args) {
  if (args.length !== 1) {
    return new Err(`wrong number of arguments. got=${args.length}, want=1`);
  }

  const arg = args[0];

  switch (arg.constructor) {
    case StringLit:
      return new Integer(arg.value.length);

    case Arr:
      return new Integer(arg.elements.length);

    default:
      return new Err(`argument to 'len' not supported, got ${arg.type()}`);
  }
}

function rest(...args) {
  if (args.length !== 1) {
    return new Err(`wrong number of arguments. got=${args.length}, want=1`);
  }

  if (args[0].type() !== ARRAY_OBJ) {
    return new Err(`argument to 'rest' must  be ARRAY, got ${args[0].type()}`);
  }

  const arr = args[0];
  const length = arr.elements.length;

  if (length > 0) {
    return new Arr(arr.elements.slice(1));
  }

  return NULL;
}

function push(...args) {
  if (args.length !== 2) {
    return new Err(`wrong number of arguments. got=${args.length}, want=2`);
  }

  if (args[0].type() !== ARRAY_OBJ) {
    return new Err(`argument to 'push' must  be ARRAY, got ${args[0].type()}`);
  }

  const arr = args[0];

  return new Arr([...arr.elements, args[1]]);
}

function log(...args) {
  console.log(...args.map((arg) => arg.inspect()));
  return NULL;
}

export const BUILTINS = {
  len: new Builtin(len),
  rest: new Builtin(rest),
  push: new Builtin(push),
  log: new Builtin(log),
};

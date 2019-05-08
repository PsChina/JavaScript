function SameValue(v1, v2) {
  if (v1 === 0 && v2 === 0) return 1 / v1 === 1 / v2;
  if (v1 !== v1 && v2 !== v2) return true;
  return v1 === v2;
}

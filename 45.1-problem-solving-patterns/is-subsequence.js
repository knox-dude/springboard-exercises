// add whatever parameters you deem necessary
function isSubsequence(s1, s2) {
  let s1Ptr = 0;
  for (let c of s2) {
    if (s1Ptr >= s1.length) return true
    if (s1[s1Ptr] == c) s1Ptr++;
  }
  if (s1Ptr >= s1.length) return true;
  return false;
}

module.exports = isSubsequence;
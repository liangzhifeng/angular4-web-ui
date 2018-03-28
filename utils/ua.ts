/**
 * User Agent Detection
 */

function checkUA(pattern) {
  return pattern.test(window.navigator.userAgent);
}

export function isChrome() {
  return checkUA(/webkit\W.*(chrome|chromium)\W/i);
}

export function isIE() {
  return checkUA(/\bTrident\b/);
}

export function isEdge() {
  return checkUA(/\bEdge\b/);
}

export function isSafari() {
  return checkUA(/webkit\W(?!.*chrome).*safari\W/i);
}

export function isWebkit() {
  return checkUA(/webkit\W/i);
}

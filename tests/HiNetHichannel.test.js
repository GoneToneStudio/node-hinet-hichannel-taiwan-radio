/**
 * Copyright 2021 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * HiNetHichannel Test
 */

const {HiNetHichannel, Proxy} = require("..");

let hichannel;
test('Init', () => {
  const proxy = new Proxy("gonetone.reh.tw", 3128, "http");
  proxy.login(process.env.PROXY_TEST_USERNAME, process.env.PROXY_TEST_PASSWORD);

  hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台", proxy);
});

test('Load Api', async () => {
  await hichannel.loadApi();
});

test('Get Play Url', async () => {
  const playUrl = await hichannel.playUrl();
  expect(playUrl).toMatch(/https?:\/\/(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])\/live\/[a-zA-Z0-9]+\/chunklist\.m3u8\?token=(.*)&expires=(.*)/i);
});

test('Get Title', () => {
  const title = hichannel.title();
  expect(typeof title).toBe('string');
});

test('Get ID', () => {
  const id = hichannel.id();
  expect(typeof id).toBe('string');
});

test('Get Desc', () => {
  const desc = hichannel.desc();
  expect(typeof desc).toBe('string');
});

test('Get Area', () => {
  const area = hichannel.area();
  expect(typeof area).toBe('string');
});

test('Get Type', () => {
  const type = hichannel.type();
  expect(typeof type).toBe('string');
});

test('Get Image Url', () => {
  const imageUrl = hichannel.imageUrl();
  expect(imageUrl).toMatch(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/i);
});

test('Get Now Program Name', () => {
  const nowProgramName = hichannel.nowProgramName();
  expect(typeof nowProgramName).toBe('string');
});

test('Get Program List', () => {
  const programList = hichannel.programList();
  expect(Array.isArray(programList)).toBe(true);
});

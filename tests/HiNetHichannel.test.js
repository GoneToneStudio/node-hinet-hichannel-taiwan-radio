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
test('Init', async () => {
  const proxy = new Proxy("gonetone.reh.tw", 3128, "http");
  proxy.login("Test", "29022716");

  hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台", proxy);
});

test('Load Api', async () => {
  await hichannel.loadApi();
});

test('Get Play Url', async () => {
  const playUrl = await hichannel.playUrl();
  expect(playUrl).toMatch(/https?:\/\/(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])\/live\/[a-zA-Z0-9]+\/chunklist\.m3u8\?token=(.*)&expires=(.*)/i);
});

test('Get Title', async () => {
  const title = await hichannel.title();
  expect(typeof title).toBe('string');
});

test('Get ID', async () => {
  const id = await hichannel.id();
  expect(typeof id).toBe('string');
});

test('Get Desc', async () => {
  const desc = await hichannel.desc();
  expect(typeof desc).toBe('string');
});

test('Get Area', async () => {
  const area = await hichannel.area();
  expect(typeof area).toBe('string');
});

test('Get Type', async () => {
  const type = await hichannel.type();
  expect(typeof type).toBe('string');
});

test('Get Image Url', async () => {
  const imageUrl = await hichannel.imageUrl();
  expect(imageUrl).toMatch(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/i);
});

test('Get Now Program Name', async () => {
  const nowProgramName = await hichannel.nowProgramName();
  expect(typeof nowProgramName).toBe('string');
});

test('Get Program List', async () => {
  const programList = await hichannel.programList();
  expect(Array.isArray(programList)).toBe(true);
});

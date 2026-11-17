/* Public website, design 8.2: the views. Content comes from data.js. No build step, no libraries. */
"use strict";

/* ---------- helpers ---------- */
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
function pl(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
function ws(s) { return String(s).replace(/\s+/g, " ").trim(); }
function first(s) { s = ws(s); var i = s.indexOf(". "); return i < 0 ? s : s.slice(0, i + 1); }
function dash(s) { return String(s).replace(/(\d)\s*-\s*(\d)/g, "$1–$2"); }
function robotName(r) { return r.name || (r.year + " robot"); }
function tbaTeamYear(y) { return "https://www.thebluealliance.com/team/" + SITE.teamNumber + "/" + y; }
function ext(url, text, cls) { return "<a" + (cls ? " class=\"" + cls + "\"" : "") + " href=\"" + esc(url) + "\" target=\"_blank\" rel=\"noopener\">" + esc(text) + "<span class=\"vh\"> (opens in a new tab)</span></a>"; }
function addr() { return "<span class=\"addr\"><span class=\"addr-t\">" + esc(SITE.email) + "</span><button type=\"button\" class=\"copy\" data-copy>Copy address</button></span>"; }
function wm(w, light) { return "<a href=\"" + esc(SITE.schoolUrl) + "\" target=\"_blank\" rel=\"noopener\"><img class=\"wm" + (light ? " wm-light" : "") + "\" src=\"img/dawson-wordmark.png\" width=\"" + w + "\" height=\"" + Math.round(w * 157 / 414) + "\" alt=\"Dawson School\"></a>"; }
/* Where a photo comes from. Opened from this folder on a computer, the copies in ../img are used. On the web no
   photo file is published with the page: each one loads from the live site's own address, so there is one public
   copy of every photo and a photo taken down from the site is gone from this demo too. The three brand marks in
   img/ are the only pictures that travel with the page. ?photos=live or ?photos=local forces one or the other. */
var PHOTOS_LIVE = (function () {
  var q = /[?&]photos=(live|local)\b/.exec(location.search);
  if (q) return q[1] === "live";
  return !(location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname));
})();
var PIC_HALF = "(min-width: 900px) 50vw, 100vw", PIC_CARD = "(min-width: 900px) 34vw, (min-width: 560px) 50vw, 100vw", PIC_WIDE = "(min-width: 1240px) 1200px, 100vw";
function pic(name, w, sizes) {
  var id = PHOTO_IDS[name];
  if (!PHOTOS_LIVE || !id) return "src=\"../img/" + esc(name) + "\"";
  var u = PHOTO_ORIGIN + "img/drive/" + id + "-";
  return "src=\"" + u + w + ".webp\" srcset=\"" + [400, 800, 1600].map(function (x) { return u + x + ".webp " + x + "w"; }).join(", ") + "\" sizes=\"" + (sizes || PIC_HALF) + "\"";
}
function mdLinks(text) {
  var re = /\[([^\]]+)\]\(robot\.html\?year=(\d{4})\)/g, out = "", last = 0, m;
  while ((m = re.exec(text))) { out += esc(text.slice(last, m.index)) + "<a href=\"#robot-" + m[2] + "\">" + esc(m[1]) + "</a>"; last = m.index + m[0].length; }
  return out + esc(text.slice(last));
}
function photo(r, cls) {
  if (NO_PHOTO[r.year]) return "<span class=\"shot " + cls + "\"><span class=\"ph\"><b>" + r.year + "</b><span>Photo wanted</span></span></span>";
  return "<span class=\"shot " + cls + "\"><img " + pic("r" + r.year + ".jpg", 800, PIC_CARD) + " width=\"1000\" height=\"750\" loading=\"lazy\" alt=\"" + esc(r.name ? r.name + ", the " + r.year + " robot" : "The " + r.year + " robot") + "\"" + (r.imagePosition ? " style=\"object-position:" + esc(r.imagePosition) + "\"" : "") + "></span>";
}
function statParts(r) { return r.stats ? String(r.stats).split(/\s+·\s+/) : []; }

var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
function parseDates(s) {
  var m = /([A-Za-z]+)\.?\s+(\d{1,2})(?:\s*[-–—]\s*(?:([A-Za-z]+)\.?\s+)?(\d{1,2}))?\s*,?\s*(\d{4})/.exec(String(s || ""));
  if (!m) return null;
  var m1 = MONTHS[m[1].slice(0, 3).toLowerCase()], m2 = m[3] ? MONTHS[m[3].slice(0, 3).toLowerCase()] : m1;
  if (m1 == null || m2 == null) return null;
  return { start: new Date(+m[5], m1, +m[2]), end: new Date(+m[5], m2, +(m[4] || m[2]), 23, 59, 59) };
}
function parseResult(res) {
  var raw = String(res || ""), rank = "", record = "", playoffs = raw, r = /Rank (\d+)(?: of (\d+))?/.exec(raw);
  if (r) {
    rank = r[2] ? r[1] + " of " + r[2] : r[1];
    var rec = /\((\d+-\d+-\d+)\)/.exec(raw);
    if (rec) record = dash(rec[1]);
    var i = raw.indexOf(" — ");
    playoffs = i >= 0 ? raw.slice(i + 3) : "";
  }
  return { rank: rank, record: record, playoffs: playoffs };
}
function resType(s) {
  s = String(s || "");
  if (/won the event/i.test(s)) return "win";
  if (/captain/i.test(s)) return "cap";
  if (/pick|playoffs|semifinal|quarterfinal/i.test(s)) return "po";
  return "played";
}
function hasType(r, fn) { return (r.results || []).some(function (x) { return fn(resType(x.result)); }); }
/* ?today=YYYY-MM-DD shows the page as it will look on another day. */
function todayDate() {
  var m = /[?&]today=(\d{4})-(\d{2})-(\d{2})(?:&|$)/.exec(location.search);
  if (m) { var d = new Date(+m[1], +m[2] - 1, +m[3], 12); if (!isNaN(d)) return d; }
  return new Date();
}

/* ---------- season log ---------- */
/* A win is a banner, because that is what a winning team takes home. The other three are a disc, a ring with a
   dot and a ring, so no mark depends on colour. */
var MARK = {
  win: "<path class=\"m-win\" d=\"M4 1h14v20l-7-5.2L4 21z\"/>",
  cap: "<circle class=\"m-ink\" cx=\"11\" cy=\"11\" r=\"8\"/>",
  po: "<circle class=\"m-line\" cx=\"11\" cy=\"11\" r=\"7\"/><circle class=\"m-ink\" cx=\"11\" cy=\"11\" r=\"3\"/>",
  played: "<circle class=\"m-line\" cx=\"11\" cy=\"11\" r=\"7\"/>"
};
function mark(type, label) {
  return "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\"" + (label ? " role=\"img\" aria-label=\"" + esc(label) + "\"><title>" + esc(label) + "</title>" : " aria-hidden=\"true\">") + MARK[type] + "</svg>";
}
function seasonStats() {
  var wins = 0, po = 0;
  ROBOTS.forEach(function (r) { (r.results || []).forEach(function (x) { var t = resType(x.result); if (t === "win") wins++; if (t !== "played") po++; }); });
  return { seasons: ROBOTS.length, wins: wins, po: po };
}
function firstYear() { return Math.min.apply(null, ROBOTS.map(function (r) { return +r.year; })); }
function recordLine() {
  var s = seasonStats();
  return "<p class=\"record-line\">" + pl(s.seasons, "season") + " since " + firstYear() + ", " + pl(s.wins, "event win") + " and " + pl(s.po, "event") + " in the playoffs.</p>";
}
function seasonLog() {
  var ys = ROBOTS.map(function (r) { return +r.year; }), lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys), cols = "";
  for (var y = lo; y <= hi; y++) {
    var r = ROBOTS.find(function (x) { return +x.year === y; });
    if (!r) { cols += "<div class=\"log-col log-none\"><span class=\"log-marks\"></span><span class=\"log-year\">" + y + "</span><span class=\"log-name\">No season</span></div>"; continue; }
    var res = r.results || [], wins = res.filter(function (x) { return resType(x.result) === "win"; });
    var label = y + (r.name ? ", " + r.name : "") + ": " + pl(res.length, "event") + wins.map(function (w) { return ", won the " + w.event; }).join("");
    cols += "<a class=\"log-col\" href=\"#robot-" + y + "\" aria-label=\"" + esc(label) + "\"><span class=\"log-marks\">" +
      res.map(function (x) { return mark(resType(x.result), x.event + ": " + x.result); }).join("") + "</span><span class=\"log-year\">" + y + "</span><span class=\"log-name\">" + esc(r.name) + "</span></a>";
  }
  return "<p class=\"log-hint\">Select a year to see that robot.</p><div class=\"log-scroll\" role=\"region\" aria-label=\"Season log, scrolls sideways\" tabindex=\"0\"><div class=\"log\">" + cols + "</div></div>" +
    "<ul class=\"legend\"><li>" + mark("win") + " Won the event</li><li>" + mark("cap") + " Alliance captain</li><li>" + mark("po") + " Picked or in the playoffs</li><li>" + mark("played") + " Played the event</li></ul>";
}
function scrollLogToEnd() {
  var w = document.querySelector(".log-scroll");
  if (w && w.scrollWidth > w.clientWidth) w.scrollLeft = w.scrollWidth;
}

/* ---------- home ---------- */
function schedule() {
  var now = todayDate(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var up = SCHEDULE_2027.map(function (e) { return { e: e, d: parseDates(e.dates) }; }).filter(function (x) { return x.d && x.d.end >= now; });
  if (!up.length) return "<h2>The season is over</h2><p>Next season's events appear here when FIRST announces them.</p>";
  var rows = up.map(function (x, i) {
    var days = Math.round((x.d.start - today) / 86400000), cd = "";
    if (i === 0) {
      if (days < 0) cd = "Happening now";
      else if (days === 0) cd = "Starts today";
      else if (days === 1) cd = "Starts tomorrow";
      else if (days <= 60) cd = "<span class=\"count-big\">" + days + "</span> days to go";
      else cd = "In " + days + " days";
    }
    return "<tr" + (i === 0 ? " class=\"next\"" : "") + "><th scope=\"row\">" + esc(x.e.event) + "</th><td class=\"when\">" + esc(dash(x.e.dates)) + "</td><td>" + esc(x.e.location) + "</td><td>" + cd + "</td></tr>";
  }).join("");
  return "<h2 id=\"sched-h\">Next event</h2><table class=\"sched\" aria-labelledby=\"sched-h\"><thead><tr><th scope=\"col\">Event</th><th scope=\"col\">Dates</th><th scope=\"col\">Place</th><th scope=\"col\"><span class=\"vh\">Starts</span></th></tr></thead><tbody>" + rows + "</tbody></table>";
}
function heroTitle() {
  var r = ROBOTS.find(function (x) { return x.awards && x.awards.length; });
  return r ? esc(r.awards[0].replace(/Winners/, "winners") + ", " + r.year + ".") : esc(SITE.teamName);
}
function bumperLabel() { return document.documentElement.getAttribute("data-alliance") === "red" ? "Swap to blue bumpers" : "Swap to red bumpers"; }
function robotLink(r, cls, shape) {
  var parts = statParts(r);
  return "<a class=\"robot-a " + cls + "\" href=\"#robot-" + r.year + "\">" + photo(r, shape) + "<span class=\"robot-meta\"><span><span class=\"robot-yr\">" + r.year + "</span> <span class=\"mute\">" + esc(r.game) + "</span></span>" +
    "<span class=\"robot-name\">" + esc(robotName(r)) + "</span>" + (r.tagline ? "<span class=\"robot-line\">" + esc(r.tagline) + "</span>" : parts.length ? "<span class=\"robot-line\">" + esc(parts.join(", ")) + "</span>" : "") + "</span></a>";
}
function names(t) { return "<ul class=\"names\">" + t.sponsors.map(function (s) { return "<li>" + esc(s.name) + "</li>"; }).join("") + "</ul>"; }
function newestTier() { return SPONSOR_TIERS.find(function (t) { return t.sponsors.length; }); }
function viewHome() {
  var tier = newestTier(), newest = ROBOTS[0];
  return "<section class=\"hero\"><div class=\"wrap\"><div class=\"hero-top\"><h1 class=\"hero-title\" tabindex=\"-1\">" + heroTitle() + "</h1>" +
    "<div class=\"hero-row\"><p class=\"lead\">" + esc(SITE.mission) + "</p><div class=\"btns\"><a class=\"btn btn-bumper\" href=\"#join\">Join the team</a><a class=\"btn\" href=\"#sponsors\">Sponsor a season</a></div></div></div>" +
    "<figure class=\"hero-shot\"><img " + pic("hero.jpg", 1600, PIC_WIDE) + " width=\"1500\" height=\"1125\" alt=\"Team 2972 with the winner's banner and their robot at the 2026 Utah Regional\">" +
    "<button type=\"button\" class=\"bumper\" id=\"bumper\" aria-label=\"" + bumperLabel() + "\"><span class=\"bumper-n\" aria-hidden=\"true\">" + SITE.teamNumber + "</span><span class=\"bumper-t\" id=\"bumperT\">" + bumperLabel() + "</span><span class=\"bumper-n\" aria-hidden=\"true\">" + SITE.teamNumber + "</span></button>" +
    "<div class=\"hero-foot\"><figcaption class=\"cap\">Utah Regional, West Valley City, 2026. The robot is <a href=\"#robot-2026\">" + esc(robotName(newest)) + "</a>.</figcaption>" +
    "<span class=\"school-line\">A Dawson School team " + wm(96) + "</span></div></figure></div></section>" +
    "<section class=\"band band-floor\" style=\"margin-top:clamp(40px,6vw,72px)\"><div class=\"wrap\" id=\"sched\">" + schedule() + "</div></section>" +
    "<section class=\"band\"><div class=\"wrap\"><h2>Competition record</h2>" + recordLine() + seasonLog() + "</div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap\"><h2>The robots</h2><div class=\"star\">" + robotLink(newest, "robot-big", "r43") +
    "<div><ul class=\"roster\">" + ROBOTS.slice(1, 4).map(function (r) { return "<li>" + robotLink(r, "", "r43") + "</li>"; }).join("") + "</ul>" +
    "<p style=\"margin-top:20px\"><a class=\"btn\" href=\"#robots\">See all " + ROBOTS.length + " robots</a></p></div></div></div></section>" +
    "<section class=\"band\"><div class=\"wrap\"><h2>Find your way in</h2><div class=\"split\" style=\"margin-top:28px\"><div class=\"s5\"><span class=\"shot r11\"><img " + pic("drivers.jpg", 800) + " width=\"1000\" height=\"1000\" loading=\"lazy\" alt=\"" + esc(SITE.memberImageAlt) + "\"></span></div>" +
    "<ul class=\"doors s7\">" +
    "<li><h3>Students</h3><p>For students who want to design, build and compete with us.</p><a class=\"textlink\" href=\"#join\">How to join</a></li>" +
    "<li><h3>Sponsors</h3><p>Every dollar goes directly toward robot parts, competition fees, travel, and outreach.</p><a class=\"textlink\" href=\"#sponsors\">Sponsor the team</a></li>" +
    "<li><h3>Mentors</h3><p>For adults who want to guide students with their time and expertise.</p><a class=\"textlink\" href=\"#join-mentors\">Become a mentor</a></li>" +
    "</ul></div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap split\"><div class=\"s7\"><span class=\"shot r43\"><img " + pic("shop.jpg", 800) + " width=\"1000\" height=\"750\" loading=\"lazy\" alt=\"" + esc(HISTORY.milestones.filter(function (m) { return m.year === "2025"; })[0].imageAlt) + "\"></span></div>" +
    "<div class=\"s5\"><h2>Our workshop</h2><p>Students make the robot's parts here, with mentors beside them.</p><ul class=\"tools\">" + SHOP_TOOLS.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
    "<p style=\"margin-top:24px\"><a class=\"textlink\" href=\"#about\">About the team</a></p></div></div></section>" +
    (tier ? "<section class=\"band\"><div class=\"wrap\"><h2>Recent sponsors, " + esc(tier.tier.replace(/\s*Sponsors?\s*/i, "").trim()) + " season</h2><div style=\"margin-top:28px\">" + names(tier) + "</div><p style=\"margin-top:28px\"><a class=\"btn\" href=\"#sponsors\">All sponsors</a></p></div></section>" : "");
}

/* ---------- robots ---------- */
var curFilter = "all";
var FILTERS = [["all", "All"], ["win", "Event winners"], ["po", "Playoffs"], ["svc", "In service"]];
function passes(r, f) {
  if (f === "win") return hasType(r, function (t) { return t === "win"; });
  if (f === "po") return hasType(r, function (t) { return t !== "played"; });
  if (f === "svc") return r.status === "In service";
  return true;
}
function galleryItem(r) {
  var parts = statParts(r);
  return "<li><a class=\"robot-a\" href=\"#robot-" + r.year + "\">" + photo(r, "r43") + "<span class=\"robot-meta\"><span><span class=\"robot-yr\">" + r.year + "</span> <span class=\"mute\">" + esc(r.game) + "</span></span><span class=\"robot-name\">" + esc(robotName(r)) + "</span>" +
    (parts.length ? "<span class=\"robot-line\">" + esc(parts.join(", ")) + "</span>" : "") + (r.status === "In service" ? "<span class=\"status status-on\">In service</span>" : "") + "</span></a></li>";
}
function gridHtml() {
  var list = ROBOTS.filter(function (r) { return passes(r, curFilter); });
  return { count: "Showing " + list.length + " of " + ROBOTS.length, html: list.map(galleryItem).join("") };
}
function highlights() {
  var li = [];
  HISTORY.milestones.forEach(function (m) { m.items.forEach(function (it) { if (it.kind === "comp") li.push("<li><b>" + esc(m.year) + "</b><span>" + mdLinks(it.text) + "</span></li>"); }); });
  return "<h2 style=\"margin-top:56px\">Highlights</h2><ul class=\"dated\">" + li.join("") + "</ul>";
}
function viewRobots() {
  var g = gridHtml();
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">Our robots</h1><p class=\"lead\" style=\"margin-top:16px\">Every robot we have built, season by season.</p><div style=\"margin-top:36px\">" + recordLine() + seasonLog() + "</div>" + highlights() + "</div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap\"><h2>Every robot</h2><div class=\"filters\" role=\"group\" aria-label=\"Filter robots\">" +
    FILTERS.map(function (f) { return "<button type=\"button\" class=\"filter\" data-filter=\"" + f[0] + "\" aria-pressed=\"" + (curFilter === f[0]) + "\">" + f[1] + "</button>"; }).join("") +
    "</div><p class=\"small mute tab\" id=\"count\" aria-live=\"polite\" style=\"margin-top:12px\">" + g.count + "</p><ul class=\"gallery\" id=\"grid\">" + g.html + "</ul></div></section>" +
    "<section class=\"band\"><div class=\"wrap stack\"><h2>Help us fill in the archive</h2><p style=\"max-width:60ch\">We don't have photos or names for many of our older robots. Were you on the team? Send photos, robot names or stories to</p><p>" + addr() + "</p></div></section>";
}
function resultsTable(r) {
  var rows = (r.results || []).map(function (x) {
    var p = parseResult(x.result), win = resType(x.result) === "win";
    return "<tr><th scope=\"row\">" + esc(x.event) + (win ? "<span class=\"won\">" + mark("win") + "Winner</span>" : "") + "</th><td>" + esc(p.rank) + "</td><td>" + esc(p.record) + "</td><td>" + esc(p.playoffs) + "</td><td>" +
      (x.tba ? ext("https://www.thebluealliance.com/event/" + x.tba, "The Blue Alliance") : "") + "</td></tr>";
  }).join("");
  return "<div class=\"tbl-scroll\" role=\"region\" aria-label=\"Results, scrolls sideways\" tabindex=\"0\"><table class=\"tbl\"><thead><tr><th scope=\"col\">Event</th><th scope=\"col\">Rank</th><th scope=\"col\">Record</th><th scope=\"col\">Playoffs</th><th scope=\"col\">Match data</th></tr></thead><tbody>" + rows + "</tbody></table></div>";
}
function sec(title, body) { return "<section class=\"sec\"><h2>" + esc(title) + "</h2><div class=\"sec-body\">" + body + "</div></section>"; }
function viewRobot(year) {
  var i = ROBOTS.findIndex(function (x) { return x.year === year; }), r = ROBOTS[i], newer = ROBOTS[i - 1], older = ROBOTS[i + 1], parts = statParts(r);
  var out = "<section class=\"band band-first\" style=\"padding-bottom:48px\"><div class=\"wrap\"><a class=\"crumb\" href=\"#robots\">All robots</a><div class=\"split\"><div class=\"" + (NO_PHOTO[year] ? "s8" : "s5") + " stack\">" +
    "<p><span class=\"robot-yr\" style=\"font-size:1.75rem\">" + year + "</span> <span class=\"mute\">" + esc(r.game) + "</span></p><h1 tabindex=\"-1\" style=\"margin-top:6px\">" + esc(robotName(r)) + "</h1>" +
    (r.tagline ? "<p class=\"lead\">" + esc(r.tagline) + "</p>" : "") + (parts.length ? "<ul class=\"statlist\">" + parts.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") +
    (r.status ? "<p><span class=\"status" + (r.status === "In service" ? " status-on" : "") + "\">" + esc(r.status) + "</span></p>" : "") + "</div>" +
    (NO_PHOTO[year] ? "" : "<div class=\"s7\">" + photo(r, "r43").replace(" loading=\"lazy\"", "") + "</div>") + "</div></div></section><div class=\"wrap\" style=\"padding-bottom:clamp(48px,7vw,96px)\">";
  if (r.results && r.results.length) out += sec("Results", resultsTable(r));
  if (r.gameSummary || r.gameVideo) out += sec("The game", (r.gameSummary ? "<p>" + esc(r.gameSummary) + "</p>" : "") + (r.gameVideo ? "<p>" + ext(r.gameVideo, "Watch the game animation on YouTube", "textlink") + "</p>" : ""));
  if (r.description) out += sec("About the robot", "<p>" + esc(r.description) + "</p>");
  if (r.specs && r.specs.length) out += sec("Specs", "<dl class=\"specs\">" + r.specs.map(function (s) { return "<div><dt>" + esc(s.label) + "</dt><dd>" + esc(s.value) + "</dd></div>"; }).join("") + "</dl>");
  if (r.mechanisms && r.mechanisms.length) out += sec("Mechanisms", "<div class=\"mech\">" + r.mechanisms.map(function (m) { return "<div><h3>" + esc(m.name) + "</h3><p>" + esc(m.text) + "</p></div>"; }).join("") + "</div>");
  var ls = [];
  if (r.reveal) ls.push(ext(r.reveal, "Robot reveal on YouTube"));
  (r.videos || []).forEach(function (v, k) { ls.push(ext(v, (r.videos.length > 1 ? "Season video " + (k + 1) : "Season video") + " on YouTube")); });
  (r.matchVideos || []).forEach(function (v) { ls.push(ext(v.url, "Match video: " + v.label)); });
  if (r.binder) ls.push(ext(r.binder, "Technical binder"));
  (r.buildBlog || []).concat(r.links || []).forEach(function (l) { ls.push(ext(l.url, l.label)); });
  ls.push(ext(tbaTeamYear(year), "The " + year + " season on The Blue Alliance"));
  out += sec("Videos and links", "<ul class=\"links\">" + ls.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>");
  out += "<nav class=\"pn\" aria-label=\"Other seasons\"><span>" + (older ? "<a href=\"#robot-" + older.year + "\">Older: " + older.year + (older.name ? ", " + esc(older.name) : "") + "</a>" : "") + "</span><span>" +
    (newer ? "<a href=\"#robot-" + newer.year + "\">Newer: " + newer.year + (newer.name ? ", " + esc(newer.name) : "") + "</a>" : "") + "</span></nav></div>";
  return out;
}

/* ---------- sponsors, join, about ---------- */
function viewSponsors() {
  var team = [];
  HISTORY.milestones.forEach(function (m) { m.items.forEach(function (it) { if (it.kind === "team") team.push({ y: m.year, t: it.text }); }); });
  team.sort(function (a, b) { return b.y - a.y; });
  var tiers = SPONSOR_TIERS.filter(function (t) { return t.sponsors.length; });
  return "<section class=\"band band-first\"><div class=\"wrap split\"><div class=\"s6 stack prose\"><h1 tabindex=\"-1\">Sponsor the team</h1><p class=\"lead\">Team 2972 runs on the generosity of local businesses, families, and our school.</p>" +
    "<p>Every dollar goes directly toward robot parts, competition fees, travel, and outreach, and toward improving our shop: the tools, machines and workspace where students build.</p>" +
    "<div class=\"btns\" style=\"margin-top:28px\">" + ext(SPONSOR_PACKET_URL, "Read the sponsorship packet", "btn btn-bumper") + "</div><p>" + addr() + "</p></div>" +
    "<div class=\"s6\"><span class=\"shot r32\"><img " + pic("stands.jpg", 800) + " width=\"1000\" height=\"666\" alt=\"" + esc(HISTORY.today.imageAlt) + "\"></span></div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap stack\"><h2>What support has built</h2><p style=\"max-width:68ch\">" + esc(ws(HISTORY.today.paragraphs[0])) + "</p><ul class=\"dated\" style=\"margin-top:32px\">" +
    team.slice(0, 3).map(function (x) { return "<li><b>" + esc(x.y) + "</b><span>" + esc(x.t) + "</span></li>"; }).join("") + "</ul></div></section>" +
    tiers.map(function (t, i) { return "<section class=\"band" + (i % 2 ? " band-floor" : "") + "\"><div class=\"wrap\"><h2>" + esc(t.tier.replace(/Sponsors/, "sponsors")) + "</h2><div style=\"margin-top:28px\">" + names(t) + "</div></div></section>"; }).join("");
}
function viewJoin(which) {
  var m = which === "mentors";
  var roles = [["Teach and coach", "Help students learn new skills, such as CAD, programming, wiring and machining, and grow as people."], ["Guide, not do", "Ask questions and steer how the team solves the season's challenge, without handing over the solution."], ["Business and outreach", "Not every mentor builds robots. Mentors also help with logistics, planning, fundraising and community events."], ["Support at competition", "Advise students between matches. During a match, the student drive team makes the decisions."]];
  var seg = "<div class=\"tabs\" role=\"tablist\" aria-label=\"Join as\">" + [["students", "Students"], ["mentors", "Mentors"]].map(function (t) {
    var on = (t[0] === "mentors") === m;
    return "<button type=\"button\" role=\"tab\" class=\"tabbtn\" id=\"tab-" + t[0] + "\" aria-controls=\"panel-" + t[0] + "\" aria-selected=\"" + on + "\" tabindex=\"" + (on ? 0 : -1) + "\" data-tab=\"" + t[0] + "\">" + t[1] + "</button>";
  }).join("") + "</div>";
  var students = "<div class=\"panel\" role=\"tabpanel\" id=\"panel-students\" aria-labelledby=\"tab-students\"" + (m ? " hidden" : "") + "><div class=\"split\"><div class=\"s7 stack prose\">" +
    "<p>Team 2972 is made up of students mainly from Dawson School. Members work on the robot, on the business side of the team, and in the community, alongside mentors who guide them.</p><p>Write to us and we will tell you how the team works and when we meet.</p><p>" + addr() + "</p></div>" +
    "<div class=\"s5\"><span class=\"shot r11\"><img " + pic("drivers.jpg", 800) + " width=\"1000\" height=\"1000\" loading=\"lazy\" alt=\"" + esc(SITE.memberImageAlt) + "\"></span></div></div></div>";
  var mentors = "<div class=\"panel prose\" role=\"tabpanel\" id=\"panel-mentors\" aria-labelledby=\"tab-mentors\"" + (m ? "" : " hidden") + ">" +
    "<p>Mentors guide the students' process. The students still do the learning, and the work, as far as their skills allow.</p><div class=\"roles\">" +
    roles.map(function (r) { return "<div><h3>" + esc(r[0]) + "</h3><p>" + esc(first(r[1])) + "</p></div>"; }).join("") + "</div>" +
    "<p>We're always looking for engineers, parents, and professionals willing to share their time and expertise with our students.</p><p>" + addr() + "</p>" +
    "<h3 style=\"margin-top:36px\">Read more from FIRST</h3><ul class=\"links\" style=\"margin-top:12px\">" +
    "<li>" + ext("https://community.firstinspires.org/the-role-of-mentors-in-first-robotics-competition", "The Role of Mentors in FIRST Robotics Competition") + "</li>" +
    "<li>" + ext("https://www.firstinspires.org/hubfs/web/program/frc/resources/frc-mentor-guide.pdf", "FRC Mentor Guide (PDF)") + "</li></ul></div>";
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">Join the team</h1><p class=\"lead\" style=\"margin-top:16px\">No robotics background required.</p><div style=\"margin-top:40px\">" + seg + students + mentors + "</div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap\"><h2>The year at a glance</h2><ol class=\"year\" style=\"margin-top:28px\">" +
    ANNUAL_EVENTS.map(function (e) { return "<li><p class=\"when\">" + esc(e.when) + "</p><h3>" + esc(e.name) + "</h3><p>" + esc(first(e.description)) + "</p></li>"; }).join("") + "</ol></div></section>";
}
function setTab(name) {
  Array.prototype.forEach.call(document.querySelectorAll("[data-tab]"), function (b) {
    var on = b.getAttribute("data-tab") === name;
    b.setAttribute("aria-selected", String(on));
    b.setAttribute("tabindex", on ? "0" : "-1");
    var p = document.getElementById("panel-" + b.getAttribute("data-tab"));
    if (p) p.hidden = !on;
  });
}
function disc(o) { return "<details class=\"disc\"><summary>" + esc(o.heading) + "</summary><p>" + esc(ws(o.body)) + "</p></details>"; }
function viewAbout() {
  var wins = [], team = HISTORY.milestones.map(function (m) { return { m: m, items: m.items.filter(function (it) { return it.kind === "team"; }) }; }).filter(function (x) { return x.items.length; });
  ROBOTS.slice().sort(function (a, b) { return a.year - b.year; }).forEach(function (r) { (r.results || []).forEach(function (x) { if (/won the event/i.test(x.result)) wins.push(x.event + " " + r.year); }); });
  var sheet = [["Team", "FRC " + SITE.teamNumber + ", " + SITE.teamName], ["School", SITE.school], ["Home", SITE.location], ["Founded", SITE.founded], ["Seasons played", String(ROBOTS.length)], ["Event wins", wins.join(", ")]];
  var imgs = { "2021": { name: "space2021.jpg", w: 900, h: 675, alt: "The team's workshop in 2021" }, "2025": { name: "shop.jpg", w: 1000, h: 750, alt: "" } };
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">About the team</h1><p class=\"lead\" style=\"margin-top:16px\">" + esc(SITE.mission) + "</p>" +
    "<div class=\"split\" style=\"margin-top:40px\"><dl class=\"sheet s7\">" + sheet.map(function (s) { return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("") + "</dl>" +
    "<div class=\"school s5\"><img class=\"wm\" src=\"img/dawson-wordmark.png\" width=\"230\" height=\"87\" alt=\"Dawson School\"><p>" + esc(first(ABOUT_SCHOOL.body)) + "</p><p>" + ext(SITE.schoolUrl, "Visit Dawson School", "textlink") + "</p></div></div>" +
    "<div class=\"disc-2\" style=\"margin-top:48px\">" + disc(ABOUT_FIRST) + disc(ABOUT_SCHOOL) + "</div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap\"><h2>What we value</h2><ul class=\"values\" style=\"margin-top:28px\">" +
    VALUES.map(function (v) { return "<li><b>" + esc(v.name) + "</b><span>" + esc(v.text) + "</span></li>"; }).join("") + "</ul></div></section>" +
    "<section class=\"band\"><div class=\"wrap\"><h2>How the team grew</h2><ol class=\"grew\" style=\"margin-top:28px\">" +
    team.map(function (x) {
      var im = imgs[x.m.year], alt = im ? (im.alt || x.m.imageAlt || "") : "";
      return "<li><p class=\"yr\">" + esc(x.m.year) + "</p><div>" + x.items.map(function (it) { return "<p>" + mdLinks(it.text) + "</p>"; }).join("") +
        (im ? "<span class=\"shot r43\"><img " + pic(im.name, 800) + " width=\"" + im.w + "\" height=\"" + im.h + "\" loading=\"lazy\" alt=\"" + esc(alt) + "\"></span>" : "") + "</div></li>";
    }).join("") + "</ol><p style=\"margin-top:32px\">Competition results are on the <a href=\"#robots\">Robots page</a>.</p>" +
    "<p class=\"linkrow\" style=\"margin-top:12px\"><a class=\"textlink\" href=\"#outreach\">Outreach</a><a class=\"textlink\" href=\"#media\">Media</a></p></div></section>";
}

/* ---------- resources ---------- */
var resCat = "all", resQ = "";
function resMatch(it, q) { q = q.toLowerCase(); return !q || (it.label + " " + (it.note || "")).toLowerCase().indexOf(q) >= 0; }
function resList() {
  var n = 0, html = RESOURCE_LINKS.map(function (g) {
    if (resCat !== "all" && g.category !== resCat) return "";
    var items = g.items.filter(function (it) { return resMatch(it, resQ); });
    if (!items.length) return "";
    n += items.length;
    return "<div class=\"res-cat\"><h2>" + esc(g.category) + "</h2><ul class=\"res-list\">" + items.map(function (it) {
      return "<li>" + ext(it.url, it.label) + (it.note ? "<span class=\"res-note\">" + esc(it.note) + "</span>" : "") + "</li>";
    }).join("") + "</ul></div>";
  }).join("");
  if (!n) html = "<p style=\"padding-top:28px\">No link matches that search. <button type=\"button\" class=\"asbtn\" data-resclear>Clear the search</button></p>";
  return { count: "Showing " + pl(n, "link"), html: html };
}
function resRefresh() {
  var g = resList();
  document.getElementById("res-list").innerHTML = g.html;
  document.getElementById("res-count").textContent = g.count;
}
function cadPart(p) {
  return "<details class=\"disc\"><summary>" + esc(p.heading) + "</summary>" + (p.body ? "<p>" + esc(p.body) + "</p>" : "") +
    (p.list ? "<ul>" + p.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") + (p.after ? "<p>" + esc(p.after) + "</p>" : "") + "</details>";
}
function viewResources() {
  resCat = "all"; resQ = "";
  var g = resList();
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">Resources</h1><p class=\"lead\" style=\"margin-top:16px\">Documents, code, and guides for team members and other FRC teams.</p>" +
    "<div class=\"res-tools\"><div class=\"filters\" role=\"group\" aria-label=\"Filter by category\">" +
    [["all", "All"]].concat(RESOURCE_LINKS.map(function (c) { return [c.category, c.category]; })).map(function (f) { return "<button type=\"button\" class=\"filter\" data-rescat=\"" + esc(f[0]) + "\" aria-pressed=\"" + (resCat === f[0]) + "\">" + esc(f[1]) + "</button>"; }).join("") + "</div>" +
    "<div class=\"field\"><label for=\"res-q\">Search resources</label><input type=\"search\" id=\"res-q\" autocomplete=\"off\"></div></div>" +
    "<p class=\"small mute tab\" id=\"res-count\" aria-live=\"polite\" style=\"margin-top:20px\">" + g.count + "</p><div class=\"res-cols\" id=\"res-list\">" + g.html + "</div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap\"><h2>3D CAD and CAM, explained</h2><div style=\"max-width:820px;margin-top:24px\">" + CAD_OVERVIEW.map(cadPart).join("") + "</div></div></section>";
}

/* ---------- outreach, media, contact ---------- */
function viewOutreach() {
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">Outreach</h1><p class=\"lead\" style=\"margin-top:16px\">How we give back to the FIRST and Dawson community.</p>" +
    "<p style=\"margin-top:16px;max-width:68ch\">From mentoring FIRST LEGO League teams to running STEM demos, we try to pass on what FIRST has given us.</p><div class=\"events\">" +
    OUTREACH_EVENTS.map(function (e) {
      return "<div><span class=\"shot r32\"><img " + pic(e.image, 800) + " width=\"" + e.w + "\" height=\"" + e.h + "\" loading=\"lazy\" alt=\"" + esc(e.name + ", Team 2972 outreach") + "\"></span>" +
        "<h2>" + esc(e.name) + "</h2><p>" + esc(e.description) + (e.date === "Annual" ? " Every year." : "") + "</p></div>";
    }).join("") + "</div></div></section>" +
    "<section class=\"band band-floor\"><div class=\"wrap stack\"><h2>Dawson FLL</h2><p style=\"max-width:68ch\">Team 2972 supports Dawson School's FIRST LEGO League program, mentoring younger students as they take their first steps in robotics.</p></div></section>";
}
function ytWatch(url) { var m = /^https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/.exec(String(url)); return m ? "https://www.youtube.com/watch?v=" + m[1] : url; }
function viewMedia() {
  var vids = MEDIA_VIDEOS.filter(function (v) { return v.url; }), pub = MEDIA_PUBLICITY.filter(function (p) { return p.url && p.title; });
  return "<section class=\"band band-first\" style=\"padding-bottom:0\"><div class=\"wrap\"><h1 tabindex=\"-1\">Media</h1><p class=\"lead\" style=\"margin-top:16px\">Photos, videos, and press coverage of the team.</p></div></section><div class=\"wrap\" style=\"padding-block:48px clamp(48px,7vw,96px)\">" +
    (vids.length ? sec("Videos", "<ul class=\"links\">" + vids.map(function (v) { return "<li><span>" + esc(v.caption || "Team 2972 video") + "</span>" + ext(ytWatch(v.url), "Watch on YouTube") + "</li>"; }).join("") + "</ul>") : "") +
    (pub.length ? sec("In the press", "<ul class=\"links\">" + pub.map(function (p) { return "<li>" + ext(p.url, p.title) + "<span class=\"mute small\">" + esc(p.outlet) + "</span></li>"; }).join("") +
      "</ul><p>Press inquiries are welcome. We coordinate them with Dawson School before materials or comments go out, so please reach us through the <a href=\"#contact\">contact page</a>.</p>") : "") +
    sec("Photos", "<p>More photos are on our robot pages and on Instagram.</p><p class=\"linkrow\"><a class=\"textlink\" href=\"#robots\">Robot pages</a>" + ext(SITE.instagram, "Instagram " + SITE.instagramHandle, "textlink") + "</p>") + "</div>";
}
function viewContact() {
  return "<section class=\"band band-first\"><div class=\"wrap\"><h1 tabindex=\"-1\">Contact</h1><p class=\"lead\" style=\"margin-top:16px\">Questions, sponsorship interest, or want to mentor? Reach out.</p>" +
    "<div class=\"split contact\" style=\"margin-top:48px\"><div class=\"s7\"><h2>Email</h2><p class=\"addr-big\">" + addr() + "</p>" +
    "<h2>Instagram</h2><p>Follow along with build season and competitions. We don't check Instagram messages, so please email us instead.</p><p>" + ext(SITE.instagram, "Instagram " + SITE.instagramHandle, "textlink") + "</p>" +
    "<h2>School</h2><p>" + esc(SITE.school) + ", " + esc(SITE.location) + "</p><p>" + ext(SITE.schoolUrl, "Visit Dawson School", "textlink") + "</p></div>" +
    "<div class=\"s5\"><h2>Where to next</h2><ul class=\"routes\"><li><a href=\"#join\">Join as a student</a></li><li><a href=\"#join-mentors\">Mentor the team</a></li><li><a href=\"#sponsors\">Sponsor the team</a></li></ul></div></div></div></section>";
}
function viewFooter() {
  var pages = [["#robots", "Robots"], ["#about", "About"], ["#sponsors", "Sponsors"], ["#join", "Join"], ["#join-mentors", "Mentor"], ["#outreach", "Outreach"], ["#media", "Media"], ["#resources", "Resources"], ["#contact", "Contact"], ["#home", "Team login"], ["#home", "Request an account"]];
  return "<div class=\"wrap\"><div class=\"ftr-grid\"><div class=\"ftr-id\"><img src=\"img/logo.png\" width=\"104\" height=\"104\" alt=\"\"><div><p class=\"ftr-name\">" + esc(SITE.teamName) + "</p><p>FRC Team " + SITE.teamNumber + ", " + esc(SITE.school) + "<br>" + esc(SITE.location) + ". Since " + esc(SITE.founded) + ".</p></div></div>" +
    "<div class=\"ftr-contact\"><h2>Contact</h2><p>" + addr() + "</p><p>" + ext(SITE.instagram, "Instagram " + SITE.instagramHandle) + "</p></div>" +
    "<div><h2>Pages</h2><ul class=\"ftr-pages\">" + pages.map(function (p) { return "<li><a href=\"" + p[0] + "\">" + p[1] + "</a></li>"; }).join("") + "</ul></div></div>" +
    "<div class=\"ftr-base\"><span>© " + todayDate().getFullYear() + " " + esc(SITE.teamName) + ", FRC Team " + SITE.teamNumber + "</span>" + wm(110, true) + "</div></div>";
}

/* ---------- router ---------- */
var PAGES = { home: viewHome, robots: viewRobots, sponsors: viewSponsors, join: viewJoin, about: viewAbout, resources: viewResources, outreach: viewOutreach, media: viewMedia, contact: viewContact };
var TITLES = { robots: "Our robots", sponsors: "Sponsor the team", join: "Join the team", "join-mentors": "Mentor the team", about: "About the team", resources: "Resources", outreach: "Outreach", media: "Media", contact: "Contact" };
function resolve(hash) {
  var h = String(hash || "").replace(/^#/, "");
  if (!/^[A-Za-z0-9-]+$/.test(h)) return "home";
  if (PAGES[h] || h === "join-mentors") return h;
  var m = /^robot-(\d{4})$/.exec(h);
  return m && ROBOTS.some(function (r) { return r.year === m[1]; }) ? h : "home";
}
/* Home shows the number over the full team name; every other page shows "2972 Team" on one line. */
function brand(home) {
  return "<img src=\"img/logo.png\" width=\"44\" height=\"44\" alt=\"\">" + (home
    ? "<span class=\"brand-n\">" + SITE.teamNumber + "</span><span class=\"brand-t\"><span>" + esc(SITE.teamName) + "</span></span>"
    : "<span class=\"brand-one\">" + SITE.teamNumber + " Team</span>") + "<span class=\"vh\">, home</span>";
}
function render() {
  var r = resolve(location.hash), m = /^robot-(\d{4})$/.exec(r), html;
  if (m) html = viewRobot(m[1]);
  else if (r === "join-mentors") html = viewJoin("mentors");
  else html = PAGES[r]();
  var view = document.getElementById("view");
  view.innerHTML = html;
  document.getElementById("brand").innerHTML = brand(r === "home");
  var key = m ? "robots" : r === "join-mentors" ? "join" : r;
  Array.prototype.forEach.call(document.querySelectorAll(".nav-a"), function (a) {
    if (a.getAttribute("data-r") === key) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  var name = m ? robotName(ROBOTS.find(function (x) { return x.year === m[1]; })) + " (" + m[1] + ")" : TITLES[r];
  document.title = (name ? name + " | " : "") + "Team " + SITE.teamNumber + " " + SITE.teamName + (name ? "" : " | Dawson School FRC");
  document.getElementById("hdr").classList.remove("open");
  document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  scrollLogToEnd();
  var h1 = view.querySelector("h1");
  if (h1) h1.focus({ preventScroll: true });
}
function swapBumpers() {
  var root = document.documentElement, next = root.getAttribute("data-alliance") === "red" ? "blue" : "red";
  root.setAttribute("data-alliance", next);
  try { localStorage.setItem("2972-alliance", next); } catch (e) { /* the choice just does not persist */ }
  var b = document.getElementById("bumper"), t = document.getElementById("bumperT");
  if (b) b.setAttribute("aria-label", bumperLabel());
  if (t) t.textContent = bumperLabel();
}
function init() {
  document.getElementById("ftr").innerHTML = viewFooter();
  window.addEventListener("hashchange", render);
  window.addEventListener("load", scrollLogToEnd);
  document.addEventListener("visibilitychange", function () { var el = document.getElementById("sched"); if (el && document.visibilityState === "visible") el.innerHTML = schedule(); });
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (!t || !t.getAttribute || t.getAttribute("role") !== "tab" || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    var next = t.getAttribute("data-tab") === "students" ? "mentors" : "students";
    setTab(next);
    var nb = document.getElementById("tab-" + next);
    if (nb) nb.focus();
    e.preventDefault();
  });
  document.getElementById("menuBtn").addEventListener("click", function () {
    var o = document.getElementById("hdr").classList.toggle("open");
    this.setAttribute("aria-expanded", String(o));
  });
  document.addEventListener("input", function (e) { if (e.target && e.target.id === "res-q") { resQ = e.target.value; resRefresh(); } });
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target : null;
    if (!el) return;
    if (el.closest("#bumper")) { swapBumpers(); return; }
    var rc = el.closest("[data-rescat]");
    if (rc) {
      resCat = rc.getAttribute("data-rescat");
      Array.prototype.forEach.call(document.querySelectorAll("[data-rescat]"), function (b) { b.setAttribute("aria-pressed", String(b === rc)); });
      resRefresh();
      return;
    }
    if (el.closest("[data-resclear]")) {
      resQ = "";
      var qi = document.getElementById("res-q");
      if (qi) { qi.value = ""; qi.focus(); }
      resRefresh();
      return;
    }
    var tb = el.closest("[data-tab]");
    if (tb) { setTab(tb.getAttribute("data-tab")); return; }
    var f = el.closest("[data-filter]");
    if (f) {
      curFilter = f.getAttribute("data-filter");
      var g = gridHtml();
      document.getElementById("grid").innerHTML = g.html;
      document.getElementById("count").textContent = g.count;
      Array.prototype.forEach.call(document.querySelectorAll("[data-filter]"), function (b) { b.setAttribute("aria-pressed", String(b === f)); });
      return;
    }
    var b = el.closest("[data-copy]");
    if (!b) return;
    var t = b.parentNode.querySelector(".addr-t"), txt = t.textContent;
    var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy address"; }, 2000); };
    var sel = function () {
      try { var rg = document.createRange(); rg.selectNodeContents(t); var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); } catch (x) { /* ignore */ }
      b.textContent = "Selected"; setTimeout(function () { b.textContent = "Copy address"; }, 2000);
    };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, sel); else sel(); } catch (x) { sel(); }
  });
  render();
}
init();

/* Site content for the 8.2 design demo. Copied unchanged from ../index.html (2026-11-16), with the two content
   updates the user gave on 2026-11-13 (the Denver venue, drill presses in the workshop). */
"use strict";
var SITE = {
  teamNumber: "2972", teamName: "Gears & Buccaneers", school: "Dawson School", location: "Lafayette, Colorado",
  founded: "2008", mission: "Building a confident and capable next generation through competitive robotics.",
  email: "robotics@dawsonschool.org", instagram: "https://www.instagram.com/frc2972/", instagramHandle: "@frc2972",
  onshapePublic: "https://cad.onshape.com/publications/27b8b2d91c3dcba99076bea5/w/6f7554126c007d8690fa9643/e/fd2bdc75e190c38dc9e2f4d9",
  schoolUrl: "https://www.dawsonschool.org",
  memberImageAlt: "Two Team 2972 students at the driver station during a match"
};
var SCHEDULE_2027 = [
  { event: "Intermountain West Regional", dates: "March 24-27, 2027", location: "Ford Idaho Center, Nampa, ID" },
  { event: "Denver Regional", dates: "April 7-10, 2027", location: "Ritchie Center, University of Denver, Denver, CO" }
];
var ANNUAL_EVENTS = [
  { name: "Fall competition", when: "October", description: "The KCMT Offseason Tournament (the Kendrick Castillo Memorial Tournament, a Colorado offseason event), plus robot demos at Broomfield Days." },
  { name: "Official season begins", when: "November", description: "New students join, we train on the shop and software, and build season starts, running until spring break in March or April." },
  { name: "Kickoff", when: "January", description: "FIRST reveals the new game. We pick a strategy and design the robot." },
  { name: "Two regionals", when: "March and April 2027", description: "The Intermountain West Regional in Nampa, Idaho (March 24-27), then the Denver Regional, our home event (April 7-10)." }
];
var ABOUT_SCHOOL = { heading: "About Dawson School", body: "Team 2972 consists of students mainly from Dawson School, an independent, private, college-prep school serving students in grades K-12 on a 107-acre campus in Lafayette, Colorado. Dawson's small class sizes and hands-on approach to learning give our students the freedom to dive deep into engineering, design, and teamwork long before college." };
var ABOUT_FIRST = { heading: "What is FIRST Robotics?", body: "FIRST Robotics Competition (FRC) challenges high school students to design, build, and program an industrial-size robot in just six weeks to compete in a new game each season. Teams combine the excitement of sport with the rigor of science and technology — working alongside professional engineers and mentors to solve a common problem. Along the way, students learn to manage a real budget, market their brand, and work as a business as much as an engineering team." };
var VALUES = [
  { name: "Respect", text: "Treat people, equipment, and spaces with care." },
  { name: "Growth", text: "Learn new skills, try hard things, and improve every day." },
  { name: "Safety", text: "Protect yourself and your teammates at all times." },
  { name: "Teamwork", text: "Communicate, support each other, and solve problems together." },
  { name: "Ownership", text: "Take responsibility for your work, tools, and commitments." },
  { name: "Inclusion", text: "Everyone belongs, contributes, and can succeed here." },
  { name: "Fun", text: "Enjoy the challenge and the journey." }
];
var HISTORY = {
  milestones: [
    { year: "2008", items: [{ kind: "team", text: "Founded as Robotics Club (RC) Dawson by a Dawson physics teacher, working out of the back of the physics room." }] },
    { year: "2009", items: [{ kind: "comp", text: "Our first FRC season." }] },
    { year: "2011", items: [{ kind: "comp", text: "Won the [Colorado Regional](robot.html?year=2011) with an aggressive defensive strategy." }] },
    { year: "2013", items: [{ kind: "comp", text: "Built our best robot of the team's first five years and moved into the top 25, where we stayed until 2017." }] },
    { year: "2014", items: [{ kind: "comp", text: "Ranked 7th at the Colorado Regional and captained the 4th alliance to the semifinals." }] },
    { year: "2019", items: [{ kind: "comp", text: "Ranked 9th in qualifiers and captained alliance 8 in Colorado." }] },
    { year: "2021", items: [{ kind: "team", text: "Moved out of the physics room and into a new, larger space." }] },
    { year: "2023", items: [
      { kind: "comp", text: "Ranked 9th and led alliance 7 at the Green Country Regional." },
      { kind: "team", text: "Started a machine shop and wrote the team's first handbook." }] },
    { year: "2025", imageAlt: "The shop with its CNC router, bandsaw and tool cabinets", items: [{ kind: "team", text: "Added a lathe and a CNC router to the shop." }] },
    { year: "2026", items: [
      { kind: "comp", text: "Our robot [Theseus](robot.html?year=2026) won the Utah Regional as the second pick of Alliance 2." },
      { kind: "team", text: "Building a permanent two-thirds-length practice field." }] }
  ],
  today: {
    heading: "Where we are now",
    paragraphs: ["Team 2972 is growing and doing well. Grants from the Dawson Parent Association and private donations have turned a back room into a real workshop, and we are building a permanent two-thirds-length practice field. Students machine parts on a lathe, a CNC mill and a CNC router, cut stock on horizontal and vertical bandsaws and a miter saw, and prototype on new 3D printers and a laser engraver/cutter. A new parts library keeps the components we need on hand, so we spend our time building instead of waiting on orders. Students learn to design, make and wire a competition robot with mentors and parent volunteers beside them."],
    imageAlt: "Team 2972 students cheering in the stands with 2 9 7 2 number signs"
  }
};
var NO_PHOTO = { "2011": 1, "2010": 1, "2009": 1 };
var ROBOTS = [
  { year: "2026", game: "REBUILT", name: "Theseus", status: "In service", tagline: "Utah Regional winners.", stats: "3 events · Utah Regional Winners · 2nd pick, Alliance 2",
    results: [
      { event: "Denver Regional", result: "Rank 49 of 55 (2-7-0)", tba: "2026code" },
      { event: "Utah Regional", result: "Rank 38 of 42 — 2nd pick of Alliance 2, won the event", tba: "2026utwv" },
      { event: "Kendrick Castillo Memorial Tournament (KCMT)", result: "Rank 14 of 31 (7-5-0) — 2nd pick, Alliance 5", tba: "2026cokc" }],
    awards: ["Utah Regional Winners"] },
  { year: "2025", game: "Reefscape", name: "Sea Bunny", status: "In service", imagePosition: "100% 70%", tagline: "Three-stage elevator that scores Coral on every level.", stats: "2 events · best rank #27 at KCMT · 3rd pick, Alliance 5",
    gameSummary: "Reefscape is the 2025 game, themed around clean oceans. Two alliances of three robots each score PVC pipes (called Coral) and playground balls (called Algae) onto goals. At the end of each match, robots move to a truss structure called the Barge and climb metal Cages to earn additional points.",
    gameVideo: "https://www.youtube.com/watch?v=YWbxcjlY9JY",
    specs: [{ label: "Weight", value: "120 lbs" }, { label: "Dimensions", value: "30\" W x 30\" L x 86\" H" }, { label: "Drive system", value: "4-wheel SDS MK4i swerve drive" }],
    mechanisms: [{ name: "Elevator", text: "Three-stage, continuous elevator." }, { name: "Coral scoring", text: "Scores Coral on all levels." }, { name: "Climber", text: "Deployable low-hang cage climber." }, { name: "Algae picker", text: "Removed during the season." }],
    results: [
      { event: "Colorado Springs Scrimmage", result: "Scrimmage" },
      { event: "Minnesota North Star Regional", result: "Rank 42 of 47 (3-8-0)", tba: "2025mnum" },
      { event: "Kendrick Castillo Memorial Tournament (KCMT)", result: "Rank 27 of 40 — 3rd pick, Alliance 5", tba: "2025cokc" }],
    videos: ["https://www.youtube.com/watch?v=CB1DmHxDGQw"],
    links: [{ label: "Code (GitHub)", url: "https://github.com/Gears-and-Buccaneers/2025" }, { label: "CAD (Onshape)", url: SITE.onshapePublic }] },
  { year: "2024", game: "Crescendo", name: "Sea Shanty", status: "Retired", imagePosition: "67% 84%", tagline: "Picked for playoff alliances at both regionals.", stats: "3 events · best rank #18 at KCMT · playoffs at both regionals",
    gameSummary: "Crescendo is the 2024 game, themed around music. Two alliances of three robots each shoot orange rings (called Notes) into goals, and hang on chains at the end of the match.",
    results: [
      { event: "Green Country Regional", result: "Rank 22 of 43 — 2nd pick, Alliance 7", tba: "2024oktu" },
      { event: "Greater Kansas City Regional", result: "Rank 20 of 42 — 2nd pick, Alliance 5", tba: "2024mokc" },
      { event: "Kendrick Castillo Memorial Tournament (KCMT)", result: "Rank 18 of 45", tba: "2024cokc" }] },
  { year: "2023", game: "Charged Up", name: "Scurvy", status: "Retired", tagline: "Telescoping arm and a 12-auto playbook.", stats: "2 regionals · rank #9 at Green Country · alliance captain",
    gameSummary: "Charged Up is the 2023 game. Two alliances of three robots each place cones and cubes onto a grid of scoring nodes, then drive onto and balance a tilting Charge Station.",
    description: "Scurvy is very narrow and light, making him ideal for a triple balance on the Charge Station. To prevent sliding off after climbing, we lock our wheels.",
    specs: [{ label: "Frame", value: "24\" x 35\" rectangular chassis" }, { label: "Drive system", value: "Swerve drive, Falcon 500 motors" }, { label: "Autonomous", value: "12 different autos, 100% success rate" }],
    mechanisms: [
      { name: "Gripper", text: "Dual pneumatics on a 4-bar mechanism with automatic piece orientation. Picks up cones and cubes from the player station and the ground." },
      { name: "Boom", text: "Two-stage AndyMark Climber-in-a-Box on a 10:1 CIM. Extends and retracts 46\" in 0.5 seconds, placing cubes on all levels and cones on the bottom and middle." },
      { name: "Auto", text: "Every permutation of placing a piece on any level, auto-balancing the Charge Station, and exiting the community." },
      { name: "Drivetrain", text: "Each swerve module has a drive motor and a turning motor for effortless maneuverability and fast turning." }],
    results: [
      { event: "Utah Regional", result: "Rank 24 of 44 (5-7-0)", tba: "2023utwv" },
      { event: "Green Country Regional", result: "Rank 9 of 47 — Captain, Alliance 7", tba: "2023oktu" }],
    binder: "https://drive.google.com/file/d/1XdiwEkw05dp_5GzMkJupP0Q2C5FbEdBQ/view?usp=sharing" },
  { year: "2022", game: "Rapid React", name: "Kunagunda", status: "Retired", imagePosition: "59% 64%", stats: "2 regionals · rebuilding year",
    gameSummary: "Rapid React is the 2022 game. Robots shoot Cargo balls into a central Hub and climb the rungs of a Hangar at the end of the match.",
    results: [{ event: "Colorado Regional", result: "Rank 41 of 41 (1-12-0)", tba: "2022code" }, { event: "Utah Regional", result: "Rank 32 of 40 (3-8-0)", tba: "2022utwv" }] },
  { year: "2019", game: "Destination: Deep Space", name: "", status: "Retired", imagePosition: "66% 68%", stats: "2 regionals · rank #9 in Colorado · alliance captain",
    gameSummary: "Destination: Deep Space is the 2019 game. Robots place Hatch Panels and Cargo on Rockets and a Cargo Ship, starting with a vision-limited Sandstorm period, and climb onto the HAB platform at the end.",
    results: [
      { event: "Colorado Regional", result: "Rank 9 of 53 — Captain, Alliance 8 (quarterfinals)", tba: "2019code" },
      { event: "Utah Regional", result: "Rank 22 of 49 — 2nd pick, Alliance 7 (quarterfinals)", tba: "2019utwv" }] },
  { year: "2018", game: "Power Up", name: "Helga", status: "Retired", stats: "1 regional · rank #15 · semifinalist",
    gameSummary: "Power Up is the 2018 game, themed as an arcade video game. Robots place Power Cubes on Switches and a Scale, and climb at the end of the match.",
    results: [{ event: "Utah Regional", result: "Rank 15 of 52 — 2nd pick, Alliance 2 (semifinals)", tba: "2018utwv" }] },
  { year: "2017", game: "Steamworks", name: "", status: "Retired", imagePosition: "79% 89%", stats: "1 regional · rank #31",
    gameSummary: "Steamworks is the 2017 game, themed around steampunk airships. Robots deliver Gears to the Airship, shoot Fuel into the Boiler, and climb ropes at the end of the match.",
    results: [{ event: "Utah Regional", result: "Rank 31 of 48 (4-5-1)", tba: "2017utwv" }] },
  { year: "2016", game: "Stronghold", name: "Sir Lancebot", status: "Retired", stats: "2 regionals · best rank #17",
    gameSummary: "Stronghold is the 2016 game, themed as a medieval siege. Robots breach defenses, shoot Boulders into the opposing Castle tower, and scale it at the end of the match.",
    results: [{ event: "Colorado Regional", result: "Rank 17 of 48 (6-5-0)", tba: "2016code" }, { event: "Las Vegas Regional", result: "Rank 29 of 49 (4-7-0)", tba: "2016nvlv" }] },
  { year: "2015", game: "Recycle Rush", name: "Centaurian", status: "Retired", stats: "2 regionals · best rank #23",
    gameSummary: "Recycle Rush is the 2015 game. Robots stack Totes and top them with Recycling Containers, with no defense between alliances.",
    videos: ["https://www.youtube.com/watch?v=DmapW3sVOgU"],
    results: [{ event: "Arkansas Rock City Regional", result: "Rank 32 — 2nd pick in playoffs", tba: "2015arfa" }, { event: "Colorado Regional", result: "Rank 23", tba: "2015code" }] },
  { year: "2014", game: "Aerial Assist", name: "", status: "Retired", imagePosition: "86% 20%", stats: "2 regionals · rank #7 in Colorado · alliance captain",
    gameSummary: "Aerial Assist is the 2014 game. Alliance partners pass large exercise balls to each other and score them in goals, earning bonus points for assists and truss shots.",
    results: [{ event: "Hub City Regional", result: "Rank 17 (7-7-0) — 2nd pick in playoffs", tba: "2014txlu" }, { event: "Colorado Regional", result: "Rank 7 (10-6-0) — Captain, Alliance 4 (semifinals)", tba: "2014code" }] },
  { year: "2013", game: "Ultimate Ascent", name: "Odd-Job", status: "Retired", imagePosition: "66% 93%", stats: "1 regional · rank #17 · playoffs",
    gameSummary: "Ultimate Ascent is the 2013 game. Robots shoot flying discs into goals and climb a metal pyramid at the end of the match.",
    description: "Our best robot to date at the time, moving the team into the top 25. Our alliance was the first to block two cross-court frisbee shots from \"King TeC\" (2169).",
    results: [{ event: "Colorado Regional", result: "Rank 17 (6-7-0) — 2nd pick in playoffs", tba: "2013code" }],
    videos: ["https://www.youtube.com/watch?v=ysP5KEcw9FU&t=9s"],
    matchVideos: [{ label: "Quarterfinal 1-2: blocking 2169's frisbee shots", url: "https://youtu.be/xhr9v2J8u3k?t=110" }] },
  { year: "2012", game: "Rebound Rumble", name: "Tim Tebot", status: "Retired", stats: "1 regional",
    gameSummary: "Rebound Rumble is the 2012 game. Robots shoot foam basketballs into hoops and balance on bridges at the end of the match.",
    results: [{ event: "Greater Kansas City Regional", result: "Rank 56 (3-6-0)", tba: "2012kc" }] },
  { year: "2011", game: "Logo Motion", name: "", status: "Retired", stats: "Colorado Regional Winners · Championship qualifier",
    gameSummary: "Logo Motion is the 2011 game. Robots hang inflatable tubes on pegs to form the FIRST logo, then deploy minibots that race up poles at the end of the match.",
    description: "Our motto was \"Is that fear I see?\" Despite a barely operational robot, we won the Colorado Regional with an aggressive defensive strategy.",
    results: [{ event: "Colorado Regional", result: "Rank 39 (9-7-0) — won the event", tba: "2011co" }, { event: "FIRST Championship, Archimedes Division", result: "Rank 88 (0-10-0)", tba: "2011arc" }],
    awards: ["Colorado Regional Winners"] },
  { year: "2010", game: "Breakaway", name: "", status: "Retired", stats: "1 regional",
    gameSummary: "Breakaway is the 2010 game. Robots kick soccer balls into goals over a field divided by bumps, and hang from a tower at the end of the match.",
    results: [{ event: "Colorado Regional", result: "Rank 39 (1-5-3)", tba: "2010co" }] },
  { year: "2009", game: "Lunacy", name: "", status: "Retired", stats: "Rookie season",
    gameSummary: "Lunacy is the 2009 game, played on a slippery floor that simulates the moon's low gravity. Robots tow trailers and score Orbit Balls into the opposing alliance's trailers.",
    results: [{ event: "Colorado Regional", result: "Rank 27 (3-4-0)", tba: "2009co" }] }
];
var SPONSOR_TIERS = [
  { tier: "2025 Sponsors", sponsors: [] },
  { tier: "2024 Sponsors", sponsors: [{ name: "BAE Systems" }, { name: "Syniti" }, { name: "NVIDIA" }, { name: "Hirsh Precision Products" }, { name: "The Goldman Family" }, { name: "Dawson School" }, { name: "Dawson Parent Association" }, { name: "Haas" }, { name: "Hagerty" }] }
];
var SPONSOR_PACKET_URL = "https://drive.google.com/file/d/1pQur7KkQSo5CY8GExVnrh-9iaMpoMrnf/view?usp=sharing";
var RESOURCE_LINKS = [
  { "category": "Team Documents", "items": [ { "label": "Student, Family, and Mentor Handbook 2025–2026", "url": "https://docs.google.com/document/d/1cmYxwgvPZEGiw9m3zzVnzU7u41QOKLFab4hHGOfGd5U/edit?usp=sharing" }, { "label": "Game Analysis and Planning Template", "url": "https://docs.google.com/document/d/1fZVxb6nVicIAbYfuTFl0PZAnThBFkbATEzExnshtqF0/edit?usp=sharing" } ] },
  { "category": "Software & Controls", "items": [ { "label": "Team GitHub", "url": "https://github.com/Gears-and-Buccaneers" }, { "label": "WPILib documentation", "url": "https://docs.wpilib.org" }, { "label": "Driver Station", "url": "https://docs.wpilib.org/en/stable/docs/software/driverstation/driver-station.html" }, { "label": "CTRE Phoenix Tuner X", "url": "https://v6.docs.ctr-electronics.com/en/stable/docs/tuner/index.html" }, { "label": "AdvantageKit", "url": "https://docs.advantagekit.org" }, { "label": "AdvantageScope", "url": "https://docs.advantagescope.org" }, { "label": "PathPlanner", "url": "https://pathplanner.dev" }, { "label": "AprilTags", "url": "https://docs.wpilib.org/en/stable/docs/software/vision-processing/apriltag/apriltag-intro.html" } ] },
  { "category": "CAD & Manufacturing", "items": [ { "label": "Our robots in Onshape (public)", "url": "https://cad.onshape.com/publications/27b8b2d91c3dcba99076bea5/w/6f7554126c007d8690fa9643/e/fd2bdc75e190c38dc9e2f4d9", "note": "View Team 2972's robot CAD in your browser. No account needed." }, { "label": "Onshape for FRC (frcdesign.org)", "url": "https://www.frcdesign.org", "note": "Free Onshape lessons built for FRC, from first sketch to full robot." }, { "label": "Onshape Learning Center", "url": "https://learn.onshape.com", "note": "Onshape's own courses on parts, assemblies and drawings." }, { "label": "ReCalc", "url": "https://www.reca.lc", "note": "Calculators for gear ratios, belts, chains, arms and elevators." }, { "label": "Chief Delphi: CAD forum", "url": "https://www.chiefdelphi.com/c/technical/cad/68", "note": "Other teams' CAD releases and design questions." } ] },
  { "category": "Build & Parts", "items": [ { "label": "WCP documentation", "url": "https://docs.wcproducts.com", "note": "West Coast Products: guides for its gearboxes, swerve and build system." }, { "label": "WCP store", "url": "https://wcproducts.com", "note": "COTS mechanisms, gears, belts and structure." }, { "label": "REV ION build system", "url": "https://docs.revrobotics.com/ion-build", "note": "REV's guides for its extrusion, brackets and motion parts." }, { "label": "REV FRC Kickoff Concepts", "url": "https://docs.revrobotics.com/frc-kickoff-concepts", "note": "Example mechanisms REV designs for each new game." }, { "label": "AndyMark", "url": "https://www.andymark.com", "note": "Kit of Parts chassis, wheels, gearboxes and field parts." }, { "label": "Swerve Drive Specialties", "url": "https://www.swervedrivespecialties.com", "note": "MK4 swerve modules and their docs." }, { "label": "The ThriftyBot", "url": "https://www.thethriftybot.com", "note": "Swerve, tubing and low-cost parts." } ] },
  { "category": "Electronics", "items": [ { "label": "FRC Wiring Basics", "url": "https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-1/intro-to-frc-robot-wiring.html" }, { "label": "Getting Started with Electronics", "url": "https://www.chiefdelphi.com/t/how-to-get-started-with-electronics/507902/8" }, { "label": "WPILib hardware basics", "url": "https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html", "note": "The control system parts and how they connect." }, { "label": "WPILib wiring best practices", "url": "https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/wiring-best-practices.html", "note": "Wire gauge, connectors and strain relief that survive a season." }, { "label": "CAN addressing", "url": "https://docs.wpilib.org/en/stable/docs/software/can-devices/can-addressing.html", "note": "How motor controllers and sensors get their CAN IDs." }, { "label": "REV Power Distribution Hub", "url": "https://docs.revrobotics.com/ion-control/pdh/overview", "note": "Breakers, channels and status lights." }, { "label": "REV SPARK MAX", "url": "https://docs.revrobotics.com/brushless/spark-max/overview", "note": "Wiring and setup for the SPARK MAX motor controller." }, { "label": "CTRE hardware reference", "url": "https://v6.docs.ctr-electronics.com/en/stable/docs/hardware-reference/index.html", "note": "Talon FX, CANcoder, Pigeon 2 and CANivore." }, { "label": "FRC radio (Vivid-Hosting)", "url": "https://frc-radio.vivid-hosting.net", "note": "Setting up and updating the robot radio." } ] },
  { "category": "Game Analysis and Strategy", "items": [ { "label": "Game Analysis and Strategy Workshop (Team 1100)", "url": "https://www.youtube.com/watch?v=CEKrkLYDAO0" }, { "label": "Strategic Design Workshop (Citrus Circuits)", "url": "https://www.youtube.com/watch?v=G6X3SrMmX3g&list=PL6j32uphg3L9sVDfxSlGSCuZr67C7WBE5&index=1" }, { "label": "Effective FIRST Strategies 2025 (Karthik Kanagasabapathy)", "url": "https://www.youtube.com/watch?v=cemXDEzBMhM&t=4717s", "note": "Opens at 1:18:37." } ] },
  { "category": "Scouting & Alliance Selection", "items": [ { "label": "Effective FIRST Strategies 2025 (Karthik Kanagasabapathy)", "url": "https://www.youtube.com/watch?v=cemXDEzBMhM", "note": "How strong teams think about strategy, from game analysis to match play." }, { "label": "Alliance Selection Process (FIRST)", "url": "https://www.youtube.com/watch?v=xr69EMH4BZM", "note": "FIRST's own explanation of how alliance selection works." }, { "label": "Scouting and Competition Strategy (Brian Maher and Joe Blay, Stuy Splash 2020)", "url": "https://www.youtube.com/watch?v=LcYxxZJn15c", "note": "Turning scouting data into match plans and a pick list." }, { "label": "Scouting and Strategy Workshop (Team 5199)", "url": "https://www.youtube.com/watch?v=IFDuudYQ230", "note": "Setting up a scouting team: what to record and how to use it." } ] },
  { "category": "General FRC", "items": [ { "label": "FIRST", "url": "https://www.firstinspires.org" }, { "label": "Chief Delphi (FRC forum)", "url": "https://www.chiefdelphi.com" }, { "label": "The Blue Alliance", "url": "https://www.thebluealliance.com" }, { "label": "Statbotics", "url": "https://www.statbotics.io" }, { "label": "Help Now Call Center (Compass Alliance)", "url": "https://www.thecompassalliance.org/call-center" } ] },
  { "category": "Other teams' resources", "items": [ { "label": "Spectrum 3847", "url": "https://www.spectrum3847.org/resources/", "note": "Guides and lessons the team shares with other teams, plus an archive of older ones." }, { "label": "The Cheesy Poofs (254)", "url": "https://www.team254.com/resources/", "note": "Technical binders, robot code and documents for every season." }, { "label": "Robonauts Everybot (118)", "url": "https://www.118everybot.org/", "note": "A simple, low-cost robot design for each FRC and FTC game." }, { "label": "Citrus Circuits (1678)", "url": "https://www.citruscircuits.org/resources", "note": "Competition resources and technical references." }, { "label": "Mechanical Advantage (6328)", "url": "https://www.littletonrobotics.org/about-6328/resources-2/", "note": "Team documents (business plans, award submissions) and links for FRC teams." }, { "label": "NASA FRC resources", "url": "https://robotics.nasa.gov/frc-resources/", "note": "A long list of resources from many teams and sponsors." } ] }
];
var CAD_OVERVIEW = [
  { "heading": "What are 3D models?", "body": "3D models are digital versions of real parts. Instead of drawing something on paper, we build it on the computer in full 3D. This lets us see how the robot will look and how everything will fit together before we make anything in real life." },
  { "heading": "Why 3D modeling matters", "list": [ "See the whole robot before we build it", "Check if parts crash into each other", "Change designs quickly (a single edit updates the whole model)", "Measure weight and balance", "Make the robot look cleaner and work better" ], "after": "At Team 2972, we use Onshape for CAD because it's easy to learn, works in the browser, and lets everyone work together on the same model." },
  { "heading": "What is CAM?", "body": "CAM is the step after CAD. If CAD is the design, CAM is the instructions. CAM turns our 3D models into the machine steps needed to actually make the parts using CNC machines, routers, laser cutters, or 3D printers. Think of CAD as drawing a cookie cutter, and CAM as generating the actual recipe and baking steps." },
  { "heading": "Why CAM matters", "list": [ "Make custom parts that fit perfectly", "Cut metal and plastic accurately", "Preview mistakes before we actually cut anything", "Print parts with the right strength and settings" ] },
  { "heading": "Tools we use", "list": [ "Onshape CAM Studio — easy toolpaths connected directly to our CAD", "Fusion 360 CAM — for more advanced CNC work", "Bambu Studio & OrcaSlicer — for slicing 3D prints so the printer knows what to do" ] },
  { "heading": "How it all fits together", "list": [ "CAD → We design the robot in Onshape.", "CAM → We create the cutting/printing instructions.", "Manufacturing → We CNC, laser-cut, or 3D print the parts.", "Assembly → We build the robot knowing things will actually fit." ] }
];
var OUTREACH_EVENTS = [
  { "name": "Broomfield Days", "date": "Annual", "description": "Robot demos for the Broomfield community.", "image": "out-broomfield.jpg", "w": 800, "h": 534 },
  { "name": "Dawson Fest", "date": "Annual", "description": "Showing our robot to Dawson families.", "image": "out-dawsonfest.jpg", "w": 800, "h": 534 },
  { "name": "Qualcomm Demo Day", "date": "", "description": "A robot demo and visit with Qualcomm.", "image": "out-qualcomm.jpg", "w": 800, "h": 534 },
  { "name": "Hirsh Precision Products Visit", "date": "", "description": "A demo day with our sponsor Hirsh Precision Products.", "image": "out-hirsh.jpg", "w": 800, "h": 598 }
];
var MEDIA_VIDEOS = [
  { "url": "https://www.youtube.com/embed/fZ4p6_IFnls", "caption": "2026 Utah Regional, Final 1" },
  { "url": "https://www.youtube.com/embed/ysP5KEcw9FU", "caption": "" }
];
var MEDIA_PUBLICITY = [
  { "title": "Dawson School team gears up for first robotics contest", "url": "https://www.denverpost.com/2014/02/03/dawson-school-team-gears-up-for-first-robotics-contest/", "outlet": "The Denver Post, Feb 2014" },
  { "title": "Dawson students design, build robots for competition", "url": "https://www.dailycamera.com/2014/01/31/dawson-students-design-build-robots-for-competition/", "outlet": "Daily Camera, Jan 2014" },
  { "title": "Dawson School students use Lego robots to learn simple coding skills", "url": "https://www.coloradohometownweekly.com/2015/12/13/dawson-school-students-use-lego-robots-to-learn-simple-coding-skills/", "outlet": "Colorado Hometown Weekly, Dec 2015" }
];
var SHOP_TOOLS = ["Lathe", "CNC mill", "CNC router", "Horizontal and vertical bandsaws", "Miter saw", "Drill presses", "3D printers", "Laser engraver/cutter", "Parts library"];
/* The live site's own photos (the same IDs are in its public content file). Used only when the demo is on the web. */
var PHOTO_ORIGIN = "https://2972robotics.com/";
var PHOTO_IDS = {
  "hero.jpg": "1VgoMdevZH3syn0BvQq7QpFz09xrDS_rt", "drivers.jpg": "1-q5Dg3zWV_GR3CpRf2SWH2MIgj_qhf_7", "stands.jpg": "1vbL6lHeviIg9wOlDE50PeHCVIAfGmPYN",
  "shop.jpg": "1MvSZKOWXEgQyI3YVKohD3G8pgHHkUVPk", "space2021.jpg": "1aBbDWG2tuJ3VwmgRu7d5c8v3AjjY5sBQ",
  "r2026.jpg": "1kJB7mksCbOY2aj5EwmAe_ai_jldiHMSM", "r2025.jpg": "1CIpymdntGF5P4Yk1CwaKKwD4YaUMh3Ty", "r2024.jpg": "1cU0ckxw1iHt9KhHVH6k0FlrfafY9gYes",
  "r2023.jpg": "1KFxccShn1-p-TFonT6Z0MKNz5ehb-oM3", "r2022.jpg": "1UJ8vY8joMgOt4XJFus7velWI3_kMPHJH", "r2019.jpg": "1mK_hTbeBtqT47yl-X5NM6w7qKABjP_zH",
  "r2018.jpg": "1c_s7bMx0XHSl4gLvWoy6dCZcjOTlgseg", "r2017.jpg": "1Xpf5v83Iv8sfqBqJ1-qoxn_OE-X0w1hE", "r2016.jpg": "15e4ofy6E9vPMFNslFfupueiwp_mnY2EL",
  "r2015.jpg": "1l7EbpBSz5Noi0CpJw3Edk1-Nuitwtr7d", "r2014.jpg": "1k3l8okOD-69VbqfliE72GiK75BeLX--R", "r2013.jpg": "14268bnptdGCGX62rJUxzgNaVPMkL8pkS",
  "r2012.jpg": "1pb7riqwgo_YCa1o4iMNu62MQ_DSvFF5R",
  "out-broomfield.jpg": "19NBd6oMYEdIqkxz0t--S6fS_LUUsJJuK", "out-dawsonfest.jpg": "1myYx0DVTaDLAlM2STzcfk8QEXSlt6HfE",
  "out-qualcomm.jpg": "1x34veuG0PSRTlf1Xokah3iYOT6kgxJ8z", "out-hirsh.jpg": "1K0lN_nOs75TIF8CLyCUBSioZpojK9aJC"
};

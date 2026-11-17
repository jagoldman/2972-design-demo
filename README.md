# Public website, design 8.2 (demo)

A design proposal for the public website of FRC Team 2972, Gears & Buccaneers. **It is not the live site**
(that is https://2972robotics.com) and it is not approved.

Open `index.html` in a browser. Nothing to install. Every page of the public site is in it: Home, Robots, each robot,
About, Sponsors, Join (students and mentors), Resources, Outreach, Media and Contact.

Made 2026-11-16 as a design that moves away from the generated look of the earlier demo. It is
**a proposal, not approved, not built in the website's code, and not reviewed by a second model.** The earlier
design ("Midnight & brass") is unchanged and is still what the live site follows.

The words, links, photos and data are the earlier demo's, copied into `data.js`. Two later facts are included: the
Denver Regional's venue and the workshop's drill presses.

## What was wrong with the earlier look

It was built from defaults that appear on most generated pages, whatever the subject:

- A dark navy page with one gold accent.
- A small upper-case label over almost every heading and card ("NEXT EVENT", "THEN", "CONTACT", "2026 · REBUILT").
- Facts joined with middle dots, and an arrow after every link.
- The same rounded card for everything: the next event, each robot, each "way in", the school box.
- Three large numbers in a row with small labels under them, counting up when they scroll into view.
- A light that runs round the border of the next-event card.
- Bricolage Grotesque with Inter, the most common pairing on generated pages.

## The new direction: flag black, bumper colour, banner lettering

Everything comes from things the team already owns.

| Part | Choice | Where it comes from |
|---|---|---|
| Ink | True black `#000000` on white `#ffffff` | The team's flag, logo and shirts are black and white. |
| Second ground | Arena grey `#eceef0`, rules `#c5cad0` | The field carpet and the aluminium. |
| Accent | Bumper blue `#1d43c0` or bumper red `#c3122a` | Every robot wears the team number on blue or red bumpers. |
| Headlines, numerals | Big Shoulders, weight 900 | Tall, tight lettering like the winner's banner in the hero photo. |
| Text | Libre Franklin | A plain American gothic; easy for a parent to read. |

**The one bold thing is the bumper.** A padded strip with "2972" at each end sits across the base of the hero photo,
the way the bumper sits under the robot. It is a button: it swaps the site's accent between blue and red, as a team
swaps bumpers between matches. The choice is remembered in the browser. If the team does not want a control here,
the strip stays and the swap goes; nothing else depends on it.

Rules that follow from this:

1. **The accent is only for acting and for winning**: the main button, a link, the page you are on, a won event.
2. **Soft corners are for padded, touchable things** (the bumper, buttons). Photos and sections are square.
3. **No boxes round content.** Sections are separated by space, a white or grey ground, and a black rule where a list
   or table starts. The only filled box is the school's.
4. **A table is used where the content is a table** (the events, a robot's results), a list where it is a list (the
   workshop's machines, the sponsors), a sentence where it is a sentence ("16 seasons since 2009, 2 event wins and
   14 events in the playoffs.").
5. **A won event is a banner** in the season chart, because that is what the winners take home. The other marks are
   a disc, a ring with a dot and a ring, so nothing depends on colour.
6. **No upper-case labels, no middle dots, no arrows on links.** A link out of the site says where it goes and tells
   a screen reader that it opens a new tab.
7. **Light only.** The page ignores the system's dark setting, as the earlier demo ignored its light one.
8. **Nothing moves by itself.** The only transition is the bumper changing colour when it is pressed.

Kept from the approved demos: the page list and menu, "2972 Team" on inner pages and the full name on Home, the
season chart that opens at the newest year on a phone, the day count that is a plain line until the event is 60 days
away or fewer (`?today=YYYY-MM-DD` shows another day), the "Photo wanted" tiles, the copy-address button, and every
word of the content.

## Files

- `index.html`: the frame (header, menu, footer). `site.css`: every style. `site.js`: the pages. `data.js`: content.
- `fonts/`: Big Shoulders and Libre Franklin (both SIL Open Font License, licences beside them).
- `img/`: the three brand marks (team logo, Dawson wordmark, Dawson D). They are already in the public website repo.

## Photos

No photo file is published with this demo. On the web, each photo loads from the live site's own address
(`https://2972robotics.com/img/drive/<id>-<width>.webp`; the IDs are in `data.js` and are the ones in the live site's
public content file). So there is one public copy of each photo, the team's own, and a photo that is taken down from
the live site's server stops showing here too. If a photo is swapped on the live site for a new one, change its ID in
`data.js` as well.

Opened from a folder on a computer (`file://` or `localhost`), the page reads copies from `../img/` instead, which
are not in this repository. `?photos=live` or `?photos=local` forces one or the other.

The page asks search engines not to index it, and it has no link-preview picture, so a chat app does not keep its own
copy of the team photo.

## Checked

Headless Chrome, 13 views at 1440, 390 and 320 px: no JavaScript errors and no sideways page scroll. Desktop and
phone screenshots of every view were read by the designer. Contrast (computed from the token values): accent blue on
white 8.0:1 and on arena grey 6.9:1, accent red on white 6.1:1 and on arena grey 5.3:1 (the same figures for white
text on a blue or red button), muted text on white 8.0:1 and on arena grey 6.9:1.

Not checked: a screen reader, real phones, and Safari.

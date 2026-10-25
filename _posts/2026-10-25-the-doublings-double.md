---
layout: post
title: The Doublings Double
author: Poe
date: 2026-10-25 21:01:14 +0000
form: Essay
description: "Doubling does not add, it multiplies, and the length of work an AI can finish on its own is doubling on a measured schedule. Why intuition keeps getting it wrong, in rice, in arithmetic, and in a city rising from farmland."
problem: "People hear 'twice as good' and quietly add instead of multiply, so measured exponential AI progress reads as hype in one year and as sudden in the next."
summary: "Measured task length for AI has doubled about every seven months, lately closer to four. A narrow AI is one skyscraper in a field; a general one is a whole city rising in height, width, and depth on shared underground infrastructure, which is why progress looks slow, then sudden."
takeaway: |
  When you hear that a capability doubled, multiply, do not add, and ask two questions: over what period, and measured how? Expect the farmland years to look unimpressive and the city to seem to arrive suddenly. Both are the same steady doubling, seen from ground level.
---

## First, a story about a chessboard

There is an old legend, told in a few different versions, about the inventor of chess and a king who wanted to reward him. The inventor asked for something that sounded modest: rice. One grain on the first square of the board. Two on the second. Four on the third. Double it on every square, all 64 of them, and that would be payment enough.

The king laughed at how little he was being asked for. It stops being funny right around halfway. By the 32nd square, the pile owed is already in the billions of grains. By the final square, the amount is more rice than exists on Earth. The king never paid. In some versions of the story, the inventor paid with his life instead, which tells you how kings handled arithmetic lessons.

Nobody's intuition survives that chessboard, and the legend has been retold for centuries precisely because of that. Our brains hear "double it" and quietly think "add a bit more." Hold onto the feeling of being fooled by it, on a harmless story about rice. Because here is the part that matters: the same doubling is no longer just a legend's trick. It is happening in the open, it is being measured, and the thing doubling is measurable: how much work an AI can finish on its own.

## The trap, as plain numbers

Here is that same trap with the story stripped off, as a small arithmetic test that catches almost everyone.

Suppose something doubles every three months. Twice as good, then twice as good again, then again, then again. Ask around for what a year of that adds up to and you will hear a quiet bit of adding: 2 + 2 + 2 + 2. Eight times better. It feels right. It is wrong.

Doubling does not add. It multiplies. Two becomes four, four becomes eight, eight becomes sixteen. A year of doubling every three months is not 8 times better. It is 16 times better.

And here is where it gets strange. The second year does not take you to 32. It takes the 16 you already have and doubles that, four more times: 256. The third year: 4,096. Nothing about the pace changed. The doublings themselves doubled.

| After | If you add (+16 a year) | If you multiply (×16 a year) |
| --- | --- | --- |
| 1 year | ×16 | ×16 |
| 2 years | ×32 | ×256 |
| 3 years | ×48 | ×4,096 |


## This pace is measured, not imagined

This is not a made up number, though one honest note comes first: the example above doubles every three months because the arithmetic stays clean. The measured pace is a little slower, and it is still strange enough. Researchers at an organization called METR track a refreshingly plain question: how long a task can an AI finish on its own, succeeding about half the time? Not a test score. A length of real work, measured against how long the same task takes a skilled person. In 2019, the answer was measured in seconds. By 2025, the most advanced systems (the industry calls them frontier models) could finish tasks that take a person an hour or two, about half the time they tried. Across that whole stretch, that length has doubled about every seven months. Fits on the most recent models suggest it may have sped up lately, closer to every four months, though the error bars are wide. At that four-month pace, three years multiply the length of work an AI can handle by about 500. At the slower seven-month pace, by about 35. The thing doubling here is one specific, measurable slice of capability, not every kind of smarts at once, and even the slow version of the number refuses to behave the way our adding brains expect.

Underneath that, the fuel is multiplying too. The computing power used to train the largest models has grown about fivefold every year, and the methods keep getting more efficient on top of the raw power. And some of the growth is not fuel at all: models have gotten better at recovering from their own mistakes, at using tools, at reasoning through a problem step by step. Fuel and craft, multiplying together, are most of what sits under the curve.

## One skyscraper in a field

Now picture two kinds of AI as two pieces of land.

The first kind is a single skyscraper standing in an empty field. Chess software is the classic tower: a hundred stories tall, superhuman, the strongest chess entity on the planet, and it cannot tell you whether it is raining outside. It will never learn to either. Every other plot of land around it stays farmland, forever. That is narrow AI: astonishing height, in exactly one place.

![One tall tower standing in an empty field of green plots](/assets/images/skyline-narrow.png)

*Narrow AI. One tower, superhuman at a single skill, farmland everywhere else, at year 0 and at year 3 alike. The tower runs off the top of the frame on purpose: in its one skill, it is off the chart.*

## A city, rising in every direction

The second kind starts as the whole field. A hundred plots, and on each one a small, unimpressive hut. Writing. Coding. Math. Drawing. Planning. Science. Conversation. None of the huts would impress anyone.

The plots do not all rise at the same speed. Real progress is lumpy: some skills leap, some stall for a while on messy, unstructured problems. But they are all standing on the same rising ground, and the settlement grows in every direction at once. The buildings get taller. New plots break ground across the width of the field as the capability reaches skills it could not touch before. And it grows backward, into depth: behind the headline skills, the supporting ones fill in, memory, self-checking, tool use, the unglamorous floors that make the tall buildings usable. Farmland becomes a village. The village becomes a town. And in a handful of years of steady doubling, the town has a skyline. Today's real systems sit somewhere between the tower and the finished city: broad, rising, and nowhere near done.

<div id="dd-embed"><img src="/assets/images/skyline-city-growth.png" alt="Two skylines side by side: farmland at year 0 and a dense city at year 3"><p><em>General AI, the same land on the same schedule. Left: year 0, farmland, the first plots just staked out. Right: year 3, after twelve doublings. The interactive version of this visual loads with JavaScript.</em></p></div>
<script src="/assets/js/doublings-double.js"></script>

## The part almost everyone misses: the underground

A city is not just buildings standing near each other. Underneath them runs one shared system: water, power, roads, sewers. Upgrade the power grid and every building plugged into it gets brighter at once.

A general AI works like that. Its skills are not separate towers. They share an underground, one common reasoning that runs beneath all of them. So when coding gets better, the improvement does not stay in coding. The same shared machinery gets better at math, and better math feeds science and logic, and each of those feeds back into the rest. The connected districts rise faster than the doubling alone would lift them; that shared lift changes who gets there first, not the measured pace of the whole city. That is why the general kind is not just a hundred narrow AIs side by side. It is a different thing entirely, and inside it, gains compound in a way the single tower never can.

## Slow, then sudden, is the same pace

This is why AI progress keeps fooling people in both directions at once. In the farmland years, it looks like nothing much is happening: a field of slightly taller huts, easy to dismiss. Then the multiplication crosses a line where the huts are suddenly buildings, and the same people ask when it got so fast. Nobody sped it up at the end. Slow, then sudden, is what one steady doubling looks like from ground level.

A fair warning to end on: a trend line is not a promise. The doubling could slow down; real things run into real limits, and nobody honest knows exactly where this one bends. But the arithmetic does not bend. If the doubling holds at anything close to its recent pace, the gap between what our adding brains expect and what actually arrives keeps doing the thing this whole piece is about.

It doubles.

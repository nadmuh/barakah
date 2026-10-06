// Blog articles. To add one: append an entry here, add its header image to blog/images/, run `node blog-src/build.mjs`.
// Body markup: ## h2, ### h3, - bullets, 1. numbered, > KEY:/NOTE:/TIP: callouts, | tables, **bold**, *italic*, [text](url).

export const PUBLISHED = '2026-10-05';

export const articles = [
  {
    slug: 'best-trade-journal-for-prop-firm-traders',
    title: 'Best Trade Journal for Prop Firm Traders (2026)',
    metaTitle: 'Best Trade Journal for Prop Firm Traders (2026) | Barakah',
    description: 'Compare spreadsheets, TraderSync, Edgewonk and Barakah. See why behavior tracking, not just P&L, keeps prop traders inside their drawdown limits.',
    keyword: 'best trade journal for prop firm traders',
    category: 'Trade Journals',
    published: PUBLISHED,
    image: 'best-trade-journal-for-prop-firm-traders.png',
    imageAlt: 'Barakah Trading header graphic for the article Best Trade Journal for Prop Firm Traders (2026)',
    lede: 'Most traders who lose a funded account do not lose it to one bad trade. They lose it to a pattern they could not see building. Here is what a prop firm trade journal actually needs to do, and how the main options compare.',
    related: ['how-to-stop-revenge-trading', 'trailing-drawdown-explained'],
    body: `
Passing an FTMO challenge is hard. **Keeping the funded account after you pass it is harder.** Most traders who get disqualified don't lose because of a single bad trade. They lose because of a pattern they couldn't see building: *revenge trading after a loss, oversizing after a win streak, or quietly drifting past their own daily loss limit.* A trade journal is supposed to catch that pattern before your prop firm does. The question is which one actually does.

## What an FTMO Trader Actually Needs From a Journal

Most journaling tools were built for discretionary swing traders tracking win rate and R-multiples. FTMO and other prop firm challenges run on a different rule set: **daily loss limits, max drawdown, consistency rules, and a hard deadline** (see [FTMO's trading objectives](https://ftmo.com/en/trading-objectives/) for the current numbers). A journal built for prop firm trading needs to answer a narrower, more urgent set of questions in real time:

- How close am I to today's daily loss limit, *right now*, not at end of day?
- Am I sizing up after losses (revenge trading) or after wins (overconfidence)?
- Does my win rate hold up during specific sessions, or am I only profitable in one 2-hour window?
- Would this week's trades have passed the firm's consistency rule if I'd stopped at my best day?

A spreadsheet or a generic journaling app can show you P&L after the fact. **It can't flag the behavioral pattern while there's still time to change course mid-challenge.**

## Comparing the Main Options

| Option | Prop firm rule tracking | Behavioral layer | Main limitation |
| --- | --- | --- | --- |
| Spreadsheets (free) | Manual | None | You must remember to log every trade |
| Generic journals (TraderSync, Edgewonk, Tradervue) | Usually not built in | Limited | Built for retail traders broadly, not evaluation rules |
| Broker-native analytics | None | None | Often can't see your funded account |
| **Barakah Trading** | Drawdown and consistency math | Flags patterns same day | Pre-launch (waitlist open) |

### Spreadsheets (Free)

Flexible and free, but entirely manual. You have to remember to log every trade, and there's no behavioral layer. A spreadsheet won't tell you that you're about to break a consistency rule; *it'll just show you the numbers after the damage is done.*

### Generic Trade Journals (TraderSync, Edgewonk, Tradervue)

These are built for retail swing and day traders broadly, not specifically for prop firm evaluation rules. They do a solid job of win-rate and R-multiple tracking, but **daily loss limits, max drawdown tracking against a specific firm's rule set, and consistency-rule monitoring usually aren't built in.** You're back to doing that math yourself.

### Broker-Native Analytics (Robinhood, TD Ameritrade, IBKR)

Useful for raw trade history, but these tools have no concept of a prop firm's rules at all, and most funded accounts run on a separate prop firm platform anyway, so broker-native analytics often can't see the account you're actually being evaluated on.

### Barakah Trading

Barakah was built around the idea that **what happened in a trade matters less than why it happened.** Connect a funded account and the platform tracks the same drawdown and consistency math an evaluation uses, surfaces the behavioral pattern behind a losing stretch, and flags it before the account breaches a rule, not after. The Basic tier covers the core journal and daily AI summary; the Pro tier adds the full Edge Discovery analytics and real-time broker data most challenge traders actually need.

> KEY: The difference between a journal that *logs* trades and a journal that *protects* an account is whether it understands the rule set you're being evaluated against, and whether it catches a behavioral pattern while you can still correct it.

## What to Look For Before You Choose

- Does it track against **your specific firm's daily loss limit and max drawdown**, not just generic P&L?
- Does it flag **behavioral patterns** (revenge trading, position-size drift) in the moment, not in a weekly report?
- Can it **connect directly to your funded account**, or are you manually re-entering every trade?
- Is there a **free or low-cost entry tier** so you can test it during one challenge before committing?

> NOTE: No journal, including Barakah, executes trades or tells you what to trade. It tells you what your own data says about how you trade, so you can decide what to do with that information.

## The Bottom Line

If you're running one FTMO or prop firm challenge, almost any journal will get you through it. If you're running multiple challenges, managing a funded account long-term, or you've been disqualified once already for a pattern you didn't catch in time, **a behavioral layer stops being a nice-to-have.** That's the gap Barakah Trading was built to close. For a deeper look at the most common pattern, read [how to stop revenge trading](/blog/how-to-stop-revenge-trading/), and see [trailing drawdown explained](/blog/trailing-drawdown-explained/) for the rule that trips up the most traders.
`,
    faq: [
      ['What should a trade journal track for prop firm challenges?', 'Beyond P&L, it should show your distance to the daily loss limit and max drawdown in real time, whether you size up after losses or wins, how your results hold up across sessions, and whether your week would pass the firm\'s consistency rule.'],
      ['Is a spreadsheet good enough as a prop firm trade journal?', 'A spreadsheet is free and flexible, but it is entirely manual and has no behavioral layer. It shows you the numbers after the damage is done, rather than flagging a pattern while you can still correct it.'],
      ['Does Barakah execute trades or give financial advice?', 'No. Barakah does not execute trades or provide financial advice. It shows you what your own trading data says about your behavior so you can decide what to do with it.'],
    ],
    sources: [
      ['FTMO — Trading Objectives', 'https://ftmo.com/en/trading-objectives/', 'daily loss and maximum loss rules for FTMO challenges'],
      ['TraderSync', 'https://tradersync.com/', 'example of a generic trade journal'],
      ['Edgewonk', 'https://edgewonk.com/', 'example of a generic trade journal'],
      ['Tradervue', 'https://www.tradervue.com/', 'example of a generic trade journal'],
    ],
  },

  {
    slug: 'futures-prop-firm-evaluation-guide',
    title: 'Futures Prop Firm Evaluations Explained — Full Guide',
    metaTitle: 'Futures Prop Firm Evaluation Guide | Barakah',
    description: 'How futures prop firm evaluations work: account sizes, trailing drawdown, consistency rules, and the behavioral mistakes that fail most attempts.',
    keyword: 'futures prop firm evaluation guide',
    category: 'Prop Firm Guides',
    published: PUBLISHED,
    image: 'futures-prop-firm-evaluation-guide.png',
    imageAlt: 'Barakah Trading header graphic for the article Futures Prop Firm Evaluations Explained, Full Guide',
    lede: 'A walkthrough of how a futures evaluation works, using Apex Trader Funding as the example, why the trailing drawdown is the rule most traders misunderstand, and the behavioral mistakes that actually fail attempts.',
    related: ['trailing-drawdown-explained', 'best-trade-journal-for-prop-firm-traders'],
    body: `
Apex Trader Funding is one of the most popular futures prop firms right now, largely because its evaluation (the "Trading Combine") has **no time limit and no daily loss limit**, just a single trailing drawdown rule to respect. That sounds simple. In practice, *it's the rule most traders misunderstand*, and misunderstanding it is the single biggest reason evaluations fail before a trader even gets close to the profit target.

## How the Evaluation Works

Apex offers account sizes from **$25K to $300K**, each with its own profit target and trailing max drawdown threshold. You trade the combine with no minimum number of trading days and no deadline. The only way to fail is to hit the trailing drawdown. Once you hit the profit target with at least the required number of trading days, you move to a funded account with simpler, static drawdown rules.

## Trailing Drawdown: The Part Everyone Gets Wrong

Unlike a static drawdown, Apex's trailing drawdown **rises with your account's highest-ever balance** (including unrealized gains during the trading day on most account types) until it reaches the starting balance, at which point it locks. That means your "floor" keeps moving up as you're winning. It also means a strong unrealized gain that you don't lock in by closing the trade can still count against you if the market reverses before end of day. For a full breakdown of the mechanic, read [trailing drawdown explained](/blog/trailing-drawdown-explained/).

> NOTE: Rules and thresholds vary by account size and change periodically. Always confirm the current trailing drawdown mechanics directly on [Apex's official help center](https://apextraderfunding.com/help-center/) before trading a live combine.

## The Behavioral Pattern That Actually Fails Combines

Having no daily loss limit removes one obvious guardrail, and that's exactly where undisciplined trading creeps in. The patterns that show up most in failed Apex combines:

- **Oversizing after an early winning streak.** Because there's no daily limit, traders increase size faster than their trailing drawdown cushion can absorb.
- **Refusing to stop after reaching the profit target for the day.** Holding for "just a bit more" and giving back enough to threaten the trailing floor.
- **Revenge trading after the trailing drawdown tightens**, trying to "make it back" before the floor locks any further. See [how to stop revenge trading](/blog/how-to-stop-revenge-trading/).

## How to Approach the Combine With Discipline

1. **Decide your max daily risk before you start**, even though Apex doesn't enforce one for you.
2. **Track your trailing drawdown floor in real time**, not just your account balance.
3. **Set a personal stopping point** once you're up on the day and treat it like a hard rule.
4. **Review every session** for the same two patterns above (sizing drift and refusal to stop) before they cost you the combine.

This is exactly the kind of self-imposed discipline that's hard to track by memory alone, especially across multiple days without a deadline pushing you to stay sharp.

## How Barakah Closes This Gap

Barakah connects directly to your funded or evaluation account and tracks your **trailing drawdown floor in real time**, not just your account balance. When your position size jumps right after a strong session (the exact moment a combine is most often lost), the Feedback Center flags it the same day, in a toast or micro-interaction tied to that trading session, instead of surfacing it in a weekly review after the combine is already over.

That's the core of what Barakah's Behavioral Discipline Engine is built to do: it doesn't just total up what happened in the combine, *it identifies the exact moment your behavior changed* so you can correct course before the trailing floor catches up to you.

> NOTE: Barakah does not execute trades or provide financial advice. It reports on your own trading data.

## The Bottom Line

Apex's no-deadline, no-daily-limit structure is genuinely trader-friendly, but it also removes the external guardrails that force discipline on firms with stricter daily rules. **The traders who pass consistently are the ones who build their own daily limits** and watch their behavioral patterns as closely as their P&L.
`,
    faq: [
      ['What is the most common reason futures evaluations fail?', 'Misunderstanding the trailing drawdown. Traders track their account balance instead of the moving floor, and fail before they get close to the profit target.'],
      ['How do I stay disciplined when an evaluation has no daily loss limit?', 'Set your own. Decide your maximum daily risk before you start, track your trailing drawdown floor in real time, and choose a personal stopping point for days when you are up.'],
      ['Where should I check the current evaluation rules?', 'Always confirm the current rules, thresholds and account sizes on the prop firm\'s own official rules or help center page, since they vary by account and change periodically.'],
    ],
    sources: [
      ['Apex Trader Funding — Help Center', 'https://apextraderfunding.com/help-center/', 'official evaluation and trailing threshold rules'],
      ['MyFundedFutures — Max EOD Trailing', 'https://help.myfundedfutures.com/en/articles/8348565-max-eod-trailing', 'how another futures firm defines its trailing drawdown'],
    ],
  },

  {
    slug: 'trailing-drawdown-explained',
    title: 'Trailing Drawdown Explained: Why Traders Get Caught Off Guard',
    metaTitle: 'Trailing Drawdown Explained for Prop Traders | Barakah',
    description: 'How trailing drawdown really works, the misreads that get prop firm traders disqualified, and how to track your floor without guesswork.',
    keyword: 'trailing drawdown explained',
    category: 'Prop Firm Guides',
    published: PUBLISHED,
    image: 'trailing-drawdown-explained.png',
    imageAlt: 'Barakah Trading header graphic for the article Trailing Drawdown Explained',
    lede: 'A trailing drawdown moves up as you win. Traders who treat it like a fixed limit get disqualified by a floor they did not know had moved. Here is how it works and how to track it.',
    related: ['futures-prop-firm-evaluation-guide', 'how-to-stop-revenge-trading'],
    body: `
MyFundedFutures (MFFU) has grown fast among futures prop traders, and like most futures evaluation firms, **its core risk rule is a trailing drawdown.** Traders coming from static-drawdown firms or stock trading often misread how it moves, and that single misunderstanding accounts for a large share of avoidable disqualifications.

## What "Trailing" Actually Means

A **static drawdown** sets one fixed floor for the life of the account. A **trailing drawdown** moves up as your account's balance (or, in some account types, your unrealized equity intraday) sets new highs, until it eventually locks once it reaches the starting balance. The practical effect: *your risk cushion shrinks the more successful you are*, right up until the rule stops trailing.

| | Static drawdown | Trailing drawdown |
| --- | --- | --- |
| Floor | Fixed for the life of the account | Rises as your balance sets new highs |
| Locks? | Always fixed | Locks once it reaches the starting balance |
| Common mistake | None: the floor never moves | Tracking balance instead of the floor |

> NOTE: Evaluation details, thresholds, and whether the trail is based on end-of-day balance or intraday unrealized equity vary by account type and change periodically. Always confirm current terms directly on [MyFundedFutures' official help center](https://help.myfundedfutures.com/en/articles/8348565-max-eod-trailing).

## Why Traders Get Caught Off Guard

- They **track account balance, not the trailing floor itself**, and don't realize how close the two have become.
- They **assume the drawdown is static** because that's what a previous firm used.
- They let an **open, unrealized gain swing back** against them without realizing it counted toward their high-water mark.
- They **increase size right after a strong day**, not accounting for how much the floor moved up with it.

## The Behavioral Trap Hiding Inside the Rule

Trailing drawdown rules punish a very specific behavior pattern: **taking on more risk right after success.** A trader who just had their best day of the month feels confident and sizes up, exactly when their trailing floor has moved closest to their balance and their margin for error is thinnest. This is a timing problem as much as a risk-management problem, and it's nearly impossible to catch by just glancing at a P&L number.

> KEY: The riskiest moment in a trailing-drawdown account isn't after a loss. It's right after your best day, when the floor has moved up the most and confidence is highest.

## How to Trade a Trailing Drawdown Account With Discipline

1. **Know your current trailing floor at all times**, not just your account balance.
2. **Build a personal rule for reducing size, not increasing it,** after a strong day.
3. **Lock in gains by closing positions** rather than holding unrealized profit that still counts toward your high-water mark.
4. **Review your sizing pattern weekly**, specifically looking at how size changed in the 24 hours after a winning day.

This is the exact pattern (sizing up right after success) that a manual spreadsheet almost never catches in time, because the trader reviewing it is the same person whose confidence caused the problem. Our [guide to choosing a prop firm trade journal](/blog/best-trade-journal-for-prop-firm-traders/) covers what to look for instead.

## How Barakah Closes This Gap

Barakah pulls your trailing drawdown floor **directly from your connected broker data** instead of relying on balance figures you enter yourself, so the floor stays accurate even as it moves. Its Behavioral Discipline Engine flags a post-win sizing shift the same day it happens, independent of how confident the trader feels in the moment, which is exactly the blind spot that causes most trailing-drawdown disqualifications.

That's the difference between a journal that logs what already happened and one that catches the pattern while there's still time to change it.

## The Bottom Line

MyFundedFutures' trailing drawdown isn't harder to pass than a static one. It's just a different shape of risk, and most failures come from treating it like a rule you check occasionally rather than a floor you track continuously. **Traders who track the floor itself, not just their balance, pass more consistently.** New to futures evaluations? Start with the [futures prop firm evaluation guide](/blog/futures-prop-firm-evaluation-guide/).
`,
    faq: [
      ['What is a trailing drawdown?', 'A trailing drawdown is a loss limit that moves up as your account sets new highs, then locks once it reaches the starting balance. Your risk cushion shrinks as you become more successful, until the rule stops trailing.'],
      ['What is the difference between a static and a trailing drawdown?', 'A static drawdown sets one fixed floor for the life of the account. A trailing drawdown rises with your balance (or, on some account types, your intraday unrealized equity) as it sets new highs.'],
      ['When is a trailing drawdown account most at risk?', 'Right after your best day. The floor has moved up the most, your margin for error is thinnest, and confidence tempts you to size up.'],
    ],
    sources: [
      ['MyFundedFutures — Max EOD Trailing', 'https://help.myfundedfutures.com/en/articles/8348565-max-eod-trailing', 'official explanation of the firm\'s trailing drawdown'],
      ['Apex Trader Funding — Help Center', 'https://apextraderfunding.com/help-center/', 'official evaluation and trailing threshold rules'],
    ],
  },

  {
    slug: 'how-to-stop-revenge-trading',
    title: 'How to Stop Revenge Trading as a Prop Firm Trader',
    metaTitle: 'How to Stop Revenge Trading as a Prop Firm Trader | Barakah',
    description: 'Revenge trading is the fastest way to fail a prop firm challenge. Learn what causes it, why willpower fails, and the system that works.',
    keyword: 'how to stop revenge trading',
    category: 'Trading Discipline',
    published: PUBLISHED,
    image: 'how-to-stop-revenge-trading.png',
    imageAlt: 'Barakah Trading header graphic for the article How to Stop Revenge Trading as a Prop Firm Trader',
    lede: 'Revenge trading is not a strategy problem, it is a behavioral one. Here is what causes it, why willpower alone does not fix it, and a practical system that does.',
    related: ['trailing-drawdown-explained', 'best-trade-journal-for-prop-firm-traders'],
    body: `
Ask any prop firm trader what actually got them disqualified, and "one bad trade" is rarely the honest answer. The honest answer is usually: *a loss, followed by a second trade taken to "get it back," followed by a third that broke the daily loss limit.* **Revenge trading isn't a strategy problem. It's a behavioral pattern**, and it's the single most common way a funded account gets lost after the hard part (passing the evaluation) is already done.

## What Revenge Trading Actually Is

Revenge trading is **taking a trade primarily to recover a loss or to "prove" the market wrong**, rather than because the setup meets your actual criteria. It's driven by the brain's *loss-aversion response* (the finding, from [Kahneman and Tversky's prospect theory](https://www.jstor.org/stable/1914185), that losses are felt more strongly than equivalent gains): a loss doesn't just cost money, it feels like an unresolved threat, and the instinct to resolve it immediately overrides the trading plan that was working fine an hour earlier.

## Why Willpower Alone Doesn't Fix It

Most traders already know revenge trading is a problem. Almost none of them think "I am about to revenge trade" in the moment. It feels like a legitimate setup, right up until the loss is realized and the pattern is obvious in hindsight. That's the core issue: **the decision to revenge trade doesn't feel like one from the inside**, which is exactly why a rule you have to remember and enforce on yourself in real time tends to fail under pressure.

> NOTE: If you can recognize a revenge trade only after it's over, the fix isn't more self-discipline. It's a system that recognizes the pattern while you're still in it.

## The Pattern to Watch For

- A **second trade entered within minutes of a loss**, especially in the same direction the first trade failed
- **Position size that increases after a loss** instead of staying flat or decreasing
- Entering a trade that **doesn't match your normal setup criteria**, taken "because the market owes you one"
- A **cluster of trades on your worst days** that looks nothing like your trade log on a normal day

## A Practical System, Not Just a Rule

1. **Set a hard stop.** After two consecutive losses, step away for a fixed period (even 15 minutes) before taking another trade.
2. **Review your size on the next trade specifically.** If it's bigger than your normal size, treat that as a signal to stop, not a conviction to trust.
3. **Keep a running log of trades taken within 10 minutes of a loss** and review that subset weekly, separate from your overall stats.
4. **Use a system that flags the pattern in the moment** rather than relying on noticing it yourself while emotional.

This is the exact gap Barakah's Behavioral Discipline Engine is built to close: *not by blocking trades or giving trading advice*, but by recognizing the sizing and timing signature of a revenge trade from your own historical pattern and surfacing it before the next trade is placed, not in a review three days later. Comparing tools? See the [best trade journals for prop firm traders](/blog/best-trade-journal-for-prop-firm-traders/).

## The Bottom Line

Revenge trading costs more funded accounts than bad strategy ever does, and it survives because **it's invisible to the person doing it in the moment.** The fix isn't trying harder to notice it yourself. It's building a system, or using one, that notices the pattern for you. It matters most on accounts with a [trailing drawdown](/blog/trailing-drawdown-explained/), where one tilt session can erase the cushion you spent weeks building.
`,
    faq: [
      ['What is revenge trading?', 'Revenge trading is taking a trade primarily to recover a loss or to prove the market wrong, rather than because the setup meets your actual criteria.'],
      ['Why doesn\'t willpower stop revenge trading?', 'Because the decision does not feel like revenge trading from the inside. It feels like a legitimate setup until the loss is realized, so a rule you have to remember and enforce on yourself under pressure tends to fail.'],
      ['What are the warning signs of revenge trading?', 'A second trade within minutes of a loss, position size that increases after a loss, trades that do not match your normal setup criteria, and a cluster of trades on your worst days.'],
    ],
    sources: [
      ['Kahneman & Tversky — Prospect Theory: An Analysis of Decision under Risk (Econometrica, 1979)', 'https://www.jstor.org/stable/1914185', 'the research behind loss aversion'],
      ['FTMO — Trading Objectives', 'https://ftmo.com/en/trading-objectives/', 'example of daily loss limit rules revenge trading can break'],
    ],
  },
];

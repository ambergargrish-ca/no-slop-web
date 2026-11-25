# UX laws, mapped to page decisions

Condensed from the Laws of UX (lawsofux.com, Jon Yablonski), restated as concrete rules for websites. For the full explanations, read the source.

| Law | Rule on the page |
|---|---|
| **Jakob's Law**: people expect your site to work like the sites they already use | Logo top left links home; nav top; cart and account top right; footer has contact and legal. Be original in style, conventional in function. |
| **Hick's Law**: more choices, slower decisions | 3 to 6 nav items. One primary action per screen. Pricing with 2 to 3 clear options. |
| **Choice overload** | Menus and catalogues get filters, categories and a recommended default. |
| **Fitts's Law**: big, close targets are faster | Touch targets 44px minimum. Primary action large and near where the eye or thumb ends up. Do not put destructive actions next to primary ones. |
| **Miller's Law**: working memory holds a handful of items | Chunk long content: groups of 3 to 7, clear subheadings, steps numbered. |
| **Proximity / Common region** | Related items close together and sharing a surface; unrelated items separated by more space. |
| **Similarity** | Things that look alike must behave alike. Links all look like links; buttons all look like buttons. |
| **Von Restorff (isolation)** | The one thing that differs gets noticed. Use this for the primary action or recommended plan, once per view. |
| **Serial position** | People remember the first and last items. Put the key nav items and the key message at the start and end. |
| **Aesthetic-usability effect** | Polish buys patience, but cannot replace usability. Do not hide broken flows under pretty visuals. |
| **Doherty threshold** | Respond within about 400ms. Use optimistic UI, skeletons sized like the real content, instant feedback on press. |
| **Goal-gradient** | Show progress in multi-step flows (checkout, booking, onboarding). People speed up near the end. |
| **Zeigarnik effect** | Unfinished tasks are remembered. Save progress; show what is left. |
| **Peak-end rule** | People judge by the best moment and the end. Design the confirmation screen and the empty or error states as carefully as the hero. |
| **Tesler's Law**: complexity has to live somewhere | Absorb it in the system: autofill addresses, remember preferences, default sensibly, so the visitor does not carry it. |
| **Postel's Law**: be liberal in what you accept | Forms accept phone numbers with spaces, emails with capitals, dates in common formats. Validate kindly. |
| **Pareto principle** | Most visitors use a few paths. Make those few paths perfect before adding more. |
| **Parkinson's Law** | Tasks expand to fill the time given. Keep forms short; ask only what is needed now. |
| **Cognitive load** | Remove anything that does not help the one action. Every extra element is a tax. |

## How to use this

**Build mode:** before designing a screen, name the 4 to 6 laws that govern it and the rule each produces. Typical sets:
- Navigation: Jakob, Hick, Serial position, Proximity.
- Forms and checkout: Goal-gradient, Zeigarnik, Postel, Tesler, Peak-end.
- Pricing: Hick, Choice overload, Von Restorff.
- Loading and feedback: Doherty.

**Review mode:** list violations as `law: what is wrong (element or file:line) -> fix`, most damaging first. Skip laws that do not apply.

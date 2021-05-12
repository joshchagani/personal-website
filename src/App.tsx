import React, { useState, useEffect, useRef } from 'react'
import { useTrail, useSpring, animated, interpolate } from 'react-spring'
import styled, { keyframes } from 'styled-components'

import Robot from './Robot'

// Hooks
import { random } from './hooks'

// Interfaces
interface ITrail {
	open: boolean
	children: any[]
}

const Trail = ({ open, children, ...props }: ITrail) => {
	const items = React.Children.toArray(children)
	const trail = useTrail(items.length, {
		config: { mass: 5, tension: 2000, friction: 400 },
		opacity: open ? 1 : 0,
		x: open ? 0 : 20,
		delay: 600,
		from: { opacity: 0, x: 20 },
	})
	return (
		<>
			{trail.map(({ x, ...rest }, index) => (
				<animated.div
					key={index}
					style={{
						...rest,
						transform: interpolate([x], (x) => `translate3d(0,${x}px,0)`),
					}}
				>
					<div>{items[index]}</div>
				</animated.div>
			))}
		</>
	)
}

export default function App() {
	const [open] = useState(true)
	const hslRef = useRef({
		h: 132,
		s: 17,
	})

	const styleProps = useSpring({
		from: {
			color: `hsl(${hslRef.current.h}, ${hslRef.current.s}%, 35%)`,
		},
		to: async (next: any) => {
			while (true) {
				hslRef.current = {
					h: random(0, 360),
					s: random(1, 100),
				}
				await next({
					color: `hsl(${hslRef.current.h}, ${hslRef.current.s}%, 35%)`,
				})
			}
		},
	})

	return (
		<Main>
			<Section1>
				<div>
					<Trail open={open}>
						<Span>I think it's</Span>
						<Span>time for a</Span>
						<Span>
							<animated.span style={styleProps}>change</animated.span>
						</Span>
					</Trail>
				</div>
				<DownArrow>&#8675;</DownArrow>
			</Section1>
			<Section2>
				<Robot />
				<P>
					My previous site had character but felt very stagnant and was missing a sense of
					funnery. It didn't feel like a dynamic place where I could freely experiment
					with unique tools, explore ideas, pontificate, or use made-up words. Simply put,
					it no longer sparked joy. So, I'm changing everything! Here's a smidgen of the
					avenues I'm excited to explore: cultivating a digital garden, finessing
					physics-based animations, getting better with finite state machines, CSS
					Houdini, never supporting IE11, and using a copious amount of emojis.
				</P>
			</Section2>
			<Section3>
				<div>
					<LittleP>
						See ya later{' '}
						<span role="img" aria-label="alligator">
							&#128010;
						</span>
						,
					</LittleP>
					<SignatureP>Joshua Chagani</SignatureP>
				</div>
			</Section3>
		</Main>
	)
}

const bouncingAnimation = keyframes`
	0% {transform: translate3d(0, 0, 0)}
	50% {transform: translate3d(0, -1rem, 0)}
	100% {transform: translate3d(0, 0, 0)}
`

const Main = styled.main`
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow-y: scroll;
	scroll-snap-type: y mandatory;
	-webkit-overflow-scrolling: touch;
`

const DownArrow = styled.div`
	position: absolute;
	width: 100%;
	color: var(--light-blue);
	font-size: 3rem;
	bottom: 1rem;
	text-align: center;

	animation: ${bouncingAnimation} 2000ms ease-in-out infinite;
`

const Section1 = styled.section`
	display: grid;
	position: relative;
	width: 100vw;
	height: 100vh;

	& > * {
		place-self: center;
	}

	@media screen and (min-width: 45rem) {
		scroll-snap-align: start;
	}
`

const Section2 = styled.section`
	display: grid;
	position: relative;
	width: min(90%, 970px);
	height: 100vh;
	margin: 0 auto;
	grid-template-rows: 0.5fr 1fr;
	grid-template-columns: 1fr;

	@media screen and (min-width: 45rem) {
		gap: 10px;
		grid-template-rows: 1fr;
		grid-template-columns: 0.8fr 1fr;
		scroll-snap-align: start;

		& > * {
			place-self: center;
		}
	}
`

const Section3 = styled.section`
	display: grid;
	position: relative;
	width: 100vw;
	height: 100vh;

	& > * {
		place-self: center;
	}

	@media screen and (min-width: 45rem) {
		scroll-snap-align: start;
	}
`

const Span = styled.span`
	display: inline-block;
	font-size: 10vw;
	font-weight: bold;
	line-height: 1;
	text-align: center;
	color: var(--light-blue);
	text-transform: uppercase;
`

const P = styled.p`
	color: hsl(0, 0%, 70.2%);
	font-size: 1.5rem;
	line-height: 1.3;

	@media screen and (min-width: 45rem) {
		font-size: 2rem;
		line-height: 1.3;
	}
`

const LittleP = styled.p`
	color: hsl(0, 0%, 70.2%);
	font-size: 1rem;
`

const SignatureP = styled.p`
	color: hsl(0, 0%, 70.2%);
	font-size: 3rem;
`

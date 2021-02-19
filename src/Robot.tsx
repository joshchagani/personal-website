import React, { useState, useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'

import RobotIcon from './assets/robot.svg'

export default function Robot() {
	const emojiRef = useRef<HTMLDivElement | null>(null)
	const [isOnScreen, setOnScreen] = useState<boolean>(false)

	const scale = useSpring({
		transform: isOnScreen ? 'scale(1)' : 'scale(0)',
	})

	useEffect(() => {
		if (isOnScreen) return
		const observer = new IntersectionObserver(
			([e]) => {
				setOnScreen(e.isIntersecting)
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.1,
			},
		)

		if (emojiRef.current) observer.observe(emojiRef.current)
	}, [emojiRef.current, isOnScreen, setOnScreen])

	return (
		<RobotWrapper ref={emojiRef}>
			<animated.img src={RobotIcon} style={scale} alt="robot icon" />
		</RobotWrapper>
	)
}

const RobotWrapper = styled.div`
	width: 70vw;
	margin: 0 auto;
	@media screen and (min-width: 45rem) {
		width: 100%;
	}
`

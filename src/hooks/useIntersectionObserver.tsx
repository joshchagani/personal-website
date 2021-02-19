import { useEffect, useState, RefObject } from 'react'

interface Args<T> extends IntersectionObserverInit {
	elementRef: RefObject<T>
	freezeOnceVisible?: boolean
}

type ReturnType = [boolean]

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>({
	elementRef,
	rootMargin = '0px',
}: Args<T>): ReturnType => {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				setIntersecting(entry.isIntersecting)
			},
			{
				rootMargin,
			},
		)
		if (elementRef.current) {
			observer.observe(elementRef.current)
		}
		return () => {
			if (elementRef.current) observer.unobserve(elementRef.current)
		}
	}, []) // Empty array ensures that effect is only run on mount and unmount

	return [isIntersecting]
}

import React from 'react'
import styled from 'styled-components'

export default function App() {
	//
	return (
		<Main>
			<h1>App is working with Snowpack!</h1>
			<h2>Styled-components are doing their thing.</h2>
		</Main>
	)
}

const Main = styled.main`
	text-align: center;

	h2 {
		color: green;
	}
`

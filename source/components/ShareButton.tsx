import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import emoji from './emoji'

export default ({ text, url, title, color, label }) =>
	navigator.share ? (
		<Button
			title="Cliquez pour partager le lien"
			onClick={() =>
				navigator
					.share({ text, url, title, color, label })
					.then(() => console.log('Successful share'))
					.catch((error) => console.log('Error sharing', error))
			}
		>
			<Icon />
			{label && <span>{label}</span>}
			{/* Created by Barracuda from the Noun Project */}
		</Button>
	) : (
		<DesktopShareButton {...{ label, color, text }} />
	)

const copyToClipboardAsync = (str) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return navigator.clipboard.writeText(str)
	return Promise.reject('The Clipboard API is not available.')
}

export const DesktopShareButton = ({ label, text, color }) => {
	const [copySuccess, setCopySuccess] = useState(false)

	return (
		<Button
			title="Cliquez pour partager le lien"
			css={`
				color: ${color};
			`}
			onClick={() => {
				copyToClipboardAsync(text).then(
					function () {
						/* clipboard successfully set */
						setCopySuccess(true)
					},
					function () {
						/* clipboard write failed */
						setCopySuccess(false)
					}
				)
			}}
		>
			<Icon />
			{!copySuccess ? (
				label ? (
					<span>{label}</span>
				) : (
					'Copier le lien'
				)
			) : (
				<span>Lien copié {emoji('✅')}</span>
			)}
			{/* Created by Barracuda from the Noun Project */}
		</Button>
	)
}

const Icon = ({}) => (
	<div
		css={`
			background: var(--color);
			width: 3rem;
			height: 3rem;
			border-radius: 2rem;
			padding: 0.5rem;
			margin: 0.6rem;
			svg {
				width: 2rem;
			}
		`}
	>
		<svg
			aria-hidden="true"
			version="1.1"
			x="0px"
			y="0px"
			viewBox="0 0 100 100"
			width="4rem"
		>
			<g transform="translate(0,-952.36218)">
				<path
					css={`
						text-indent: 0;
						text-transform: none;
						direction: ltr;
						block-progression: tb;
						baseline-shift: baseline;
						color: var(--textColor);
						enable-background: accumulate;
					`}
					d="m 67,971.36217 c -5.4991,0 -10,4.50082 -10,10 0,1.123 0.1857,2.20885 0.5312,3.21875 l -17.125,11.125 c -1.8339,-2.03453 -4.4689,-3.34375 -7.4062,-3.34375 -5.4991,0 -10,4.50082 -10,10.00003 0,5.4992 4.5009,10 10,10 2.9494,0 5.6028,-1.2946 7.4375,-3.3437 l 17.0937,11.1249 c -0.3515,1.0177 -0.5312,2.0857 -0.5312,3.2188 0,5.4992 4.5009,10 10,10 5.4991,0 10,-4.5008 10,-10 0,-5.4992 -4.5009,-10 -10,-10 -2.9373,0 -5.5723,1.3092 -7.4062,3.3438 l -17.125,-11.125 c 0.3455,-1.0099 0.5312,-2.0958 0.5312,-3.2188 0,-1.1331 -0.1797,-2.2011 -0.5312,-3.21873 l 17.0937,-11.12505 c 1.8347,2.04912 4.4881,3.34375 7.4375,3.34375 5.4991,0 10,-4.50082 10,-10 0,-5.49918 -4.5009,-10 -10,-10 z m 0,4 c 3.3373,0 6,2.66262 6,6 0,3.33738 -2.6627,6 -6,6 -3.3373,0 -6,-2.66262 -6,-6 0,-3.33738 2.6627,-6 6,-6 z m -34,21 c 3.3373,0 6,2.6626 6,6.00003 0,3.3374 -2.6627,6 -6,6 -3.3373,0 -6,-2.6626 -6,-6 0,-3.33743 2.6627,-6.00003 6,-6.00003 z m 34,21.00003 c 3.3373,0 6,2.6626 6,6 0,3.3374 -2.6627,6 -6,6 -3.3373,0 -6,-2.6626 -6,-6 0,-3.3374 2.6627,-6 6,-6 z"
					fill="var(--textColor)"
					fillOpacity="1"
					stroke="none"
					marker="none"
					visibility="visible"
					display="inline"
					overflow="visible"
				/>
			</g>
		</svg>
	</div>
)

const Button = styled.button`
	margin: 0 auto;
	display: flex;
	align-items: center;
	font-size: 100%;
`

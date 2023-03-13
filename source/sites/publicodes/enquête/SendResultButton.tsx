import { useSelector } from 'react-redux'
import { buildEndURL } from '../../../components/SessionBar'
import { useEngine } from '../../../components/utils/EngineContext'
import { situationSelector } from '../../../selectors/simulationSelectors'

export default ({}) => {
	const { userID } = useSelector((state) => state.enquête)
	const situation = useSelector(situationSelector),
		situationQueryString = Object.entries(situation).reduce(
			(memo, [k, v]) =>
				memo +
				(!memo.length ? '?' : '&') +
				encodeURIComponent(k) +
				'=' +
				encodeURIComponent(typeof v === 'object' ? v.valeur : v),
			''
		)
	const engine = useEngine(),
		rules = useSelector((state) => state.rules)
	const endURL = buildEndURL(rules, engine),
		endQueryString = endURL.replace('/fin?', '&')

	return (
		<a
			href={`/enquête/${userID}${situationQueryString}${endQueryString}`}
			className="ui__ button cta"
		>
			Envoyer mes résultats
		</a>
	)
}

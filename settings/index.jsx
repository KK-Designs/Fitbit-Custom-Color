function mySettings(props) {
	return (
		<Page>
			<Section title={<Text bold align="center">Color Settings</Text>}>
				<ColorSelect
					settingsKey="timeColor"
					colors={[
					{color: '#fa2e00'},
					{color: '#800000'},
					{color: 'sandybrown'},
					{color: 'gold'},
					{color: '#ffa500'},
					{color: '#00dede'},
					{color: '#0053fa'},
					{color: '#9900ff'},
					{color: '#e500fa'}
					]}
				/>

				<TextInput
					label="Custom Color"
					settingsKey="timeColor"
				/>
			</Section>
		</Page>
	);
}

registerSettingsPage(mySettings);

const readline = require('readline-sync');
const Parser = require('rss-parser');
const unicode = require('unidecode');
const robots = {
  text: require('./robots/text'),
  gTrends: require('./robots/gTrends'),
  wikipedia : require('./robots/wikipedia')
}

async function start(){
  const content = {} 
  content.searchTerm = await askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()
  content.wikiPediaContent = await robots.wikipedia(content)
  await robots.text(content)

  async function askAndReturnSearchTerm () {
      const response = readline.question('Type a Wikipedia search term or G to fetch google trends: ')
      var value = (response.toUpperCase() === 'G') ?  await robots.gTrends() : response
      if(!value){
        console.log('You don\'t defined any search term...')
        console.log('Exiting Program...')
        process.exit()
      }
      return value
  
  }

  function askAndReturnPrefix(){
      const prefix = ['Who is','What is','The history of']
      const selectedPrefixIndex = readline.keyInSelect(prefix,'Choose an option for \''+unicode(content.searchTerm)+' \':')
      const selectedPrefixText = prefix[selectedPrefixIndex]
      if(!selectedPrefixText){
        console.log('You don\'t defined a option for your term...')
        console.log('Exiting Program...')
        process.exit()
      }
      return selectedPrefixText
  }



}

start()
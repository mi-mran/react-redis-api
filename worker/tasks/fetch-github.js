var fetch = require('node-fetch');
var redis = require('redis')

client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGithub() {
    let resultCount = 1;
    let onPage = 0;

    const allJobs = [];

    while(resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);

        resultCount = jobs.length
        console.log('Retrieved', resultCount, 'from page', onPage);
        onPage++;
    }

    console.log('Retrieved', allJobs.length, 'jobs.');

    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect') ||
            jobTitle.includes('lead') ||
            jobTitle.includes('director') ||
            jobTitle.includes('experienced')
        ) {
            return false;
        }

        return true;
    })

    console.log('Filtered jobs to', jrJobs.length, 'entries.')

    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({success});
}

module.exports = fetchGithub;
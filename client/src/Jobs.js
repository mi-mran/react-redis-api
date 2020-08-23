import React from 'react';
import Job from './Job';
import JobDesc from './JobDesc';
import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

export default function Jobs({jobs}) {
    console.log(jobs[0])

    // for JobDesc
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // for pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 30);
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice((activeStep * 30), (activeStep * 30) + 30)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className='jobs'>
            <JobDesc open={open} job={selectedJob} handleClose={handleClose}/>

            <Typography variant='h4' component='h1'>
                Entry Level from Github Jobs
            </Typography>

            <Typography variant='h6' component='h1'>
                Found {numJobs} jobs.
            </Typography>

            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={
                        () => 
                            {
                                handleClickOpen();
                                selectJob(job)
                            }
                    }/>
                )
            }

            <div className='pageNum'>
                Page {activeStep + 1} of {numPages}
            </div>

            <MobileStepper
                  variant="dots"
                  steps={numPages}
                  position="static"
                  activeStep={activeStep}
                  className={classes.root}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                  }
            />
        </div>
    )
}
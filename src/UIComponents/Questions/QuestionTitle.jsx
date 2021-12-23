import React, { useState } from 'react'
import { Popper, Box } from '@mui/material';

const QuestionTitle = ({ params }) => {
    console.log('here');
    //Popup handler
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMouseOnTitle = (e, questionTitle) => {
        console.log('ejhebfeouhbfe');
        console.log(questionTitle);
        setAnchorEl(e.currentTarget);
    }
    return (
        <div className="questionTagsTitle" onMouseEnter={(e) => handleMouseOnTitle(e, params.value)} onMouseLeave={() => setAnchorEl(null)}>
            <div className="title">
                {
                    params.value[1].length >= 10
                        ?
                        `${params.value[1].slice(0, 10)} ...`
                        :
                        params.value[1]
                }
            </div>
            <div className="tags">
                {params.value[0]}
            </div>
            <Popper open={anchorEl !== null}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    {params.value[1]}
                </Box>
            </Popper>
        </div>
    );
}
export default QuestionTitle;

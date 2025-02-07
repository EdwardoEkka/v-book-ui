import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Container, Grid, Card, CardContent, Typography, Avatar, Box } from '@mui/material'

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.user.user)

    return (
        <Container maxWidth="md" sx={{py:"16px"}}>
            <Grid container spacing={3} justifyContent="center" sx={{alignItems:"center"}}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" justifyContent="center" mb={3}>
                                <Avatar
                                    sx={{ width: 100, height: 100 }}
                                    alt={user.name}
                                    src="/avatar.png"
                                />
                            </Box>
                            <Typography variant="h4" align="center" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
                                {user.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage

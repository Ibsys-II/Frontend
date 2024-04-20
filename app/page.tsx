import React from "react";
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {Box} from "@mui/joy";
import {OverviewCardComponent} from "@/components/shared/OverviewCardComponent";

const Home: React.FC = () => {
    return (
        <PageWrapperComponent title={"Startseite"}>
            <Box>
                <OverviewCardComponent />
            </Box>
        </PageWrapperComponent>
    );
}

export default Home;

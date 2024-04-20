import React from "react";
import {PageWrapperComponent} from "@/components/shared/PageWrapperComponent";
import {OverviewCardComponent} from "@/components/shared/OverviewCardComponent";
import {SectionListComponent} from "@/components/shared/page-section/SectionListComponent";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {Button} from "@mui/joy";

const Home: React.FC = () => {
    return (
        <PageWrapperComponent>
            <SectionListComponent>
                <OverviewCardComponent />
                <PageSectionComponent
                    title={"Titel des Abschnitts 1"}
                    subtitle={"Untertitel Lorem ipsum dolor sit amet"}
                >
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
                </PageSectionComponent>
                <PageSectionComponent
                    title={"Titel des Abschnitts 2"}
                    subtitle={"Untertitel Lorem ipsum dolor sit amet"}
                >
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
                </PageSectionComponent>
                <PageSectionComponent
                    title={"Titel des Abschnitts 3"}
                    subtitle={"Untertitel Lorem ipsum dolor sit amet"}
                >
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum
                </PageSectionComponent>
            </SectionListComponent>
        </PageWrapperComponent>
    );
}

export default Home;

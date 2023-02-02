import { FC } from 'react';
import useLoading from 'hooks/useLoading';
import { Box, styled, Typography } from '@mui/material';
import { IChangeRequest } from 'component/changeRequest/changeRequest.types';

import {
    StyledCount,
    StyledProjectInfoWidgetContainer,
    StyledWidgetTitle,
} from './ProjectInfo.styles';
import { useProjectChangeRequests } from 'hooks/api/getters/useProjectChangeRequests/useProjectChangeRequests';
import { WidgetFooterLink } from './WidgetFooterLink';

interface IChangeRequestsWidgetProps {
    projectId: string;
}

const StyledChangeBox = styled(Box)(({ theme }) => ({
    textAlign: 'left',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadiusMedium,
    alignItems: 'center',
}));

const StyledChangeRequestStatusInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const StyledApprovedCount = styled(StyledCount)(({ theme }) => ({
    background: theme.palette.activityIndicators.recent,
    padding: theme.spacing(0, 1),
    marginRight: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
}));

const StyledInReviewCount = styled(StyledCount)(({ theme }) => ({
    background: theme.palette.activityIndicators.primary,
    padding: theme.spacing(0, 1),
    marginRight: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
}));

const StyledSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing(0.5),
}));

const ChangeRequestsLabel = () => (
    <Typography
        component="span"
        variant="body2"
        color="text.secondary"
        lineHeight={1}
    >
        change requests
    </Typography>
);

export const ChangeRequestsWidget: FC<IChangeRequestsWidgetProps> = ({
    projectId,
}) => {
    const { changeRequests, loading } = useProjectChangeRequests(projectId);
    const loadingRef = useLoading(loading);
    const toBeApplied = changeRequests?.filter(
        (changeRequest: IChangeRequest) => changeRequest?.state === 'Approved'
    ).length;
    const toBeReviewed = changeRequests?.filter(
        (changeRequest: IChangeRequest) => changeRequest?.state === 'In review'
    ).length;

    return (
        <StyledProjectInfoWidgetContainer ref={loadingRef}>
            <StyledWidgetTitle>Open change requests</StyledWidgetTitle>

            <StyledChangeBox
                sx={{ background: theme => theme.palette.success.light }}
            >
                <StyledSubtitle>To be applied</StyledSubtitle>
                <StyledChangeRequestStatusInfo>
                    <StyledApprovedCount>
                        {toBeApplied}
                    </StyledApprovedCount>{' '}
                    <ChangeRequestsLabel />
                </StyledChangeRequestStatusInfo>
            </StyledChangeBox>
            <StyledChangeBox
                sx={{ background: theme => theme.palette.secondary.light }}
            >
                <StyledSubtitle>To be reviewed</StyledSubtitle>
                <StyledChangeRequestStatusInfo>
                    <StyledInReviewCount>{toBeReviewed}</StyledInReviewCount>{' '}
                    <ChangeRequestsLabel />
                </StyledChangeRequestStatusInfo>
            </StyledChangeBox>
            <WidgetFooterLink to={`/projects/${projectId}/change-requests`}>
                View change requests
            </WidgetFooterLink>
        </StyledProjectInfoWidgetContainer>
    );
};

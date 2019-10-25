import api from 'api';

export type CountDataType = api.v1.homepage.getcountdata.Response;
export type DeviceDataType = api.v1.homepage.getdevicedistributiondata.colDeviceDistribution;
export type StatsDataReqType = api.v1.homepage.getvoicestatisticsdata.Request;
export type StatsDataType = api.v1.homepage.getvoicestatisticsdata.VoiceHashModel;
export type OriginDataType = api.v1.homepage.getvoiceorigindata.voicePrintOrigin;

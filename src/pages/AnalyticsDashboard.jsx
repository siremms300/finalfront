// components/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import {
  FaUsers,
  FaEye,
  FaClock,
  FaGlobeAmericas,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaChartLine,
  FaMousePointer,
  FaScroll,
  FaFileDownload,
  FaVideo,
  FaExchangeAlt,
  FaUserClock,
  FaChartBar,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaDownload,
  FaFileExport,
  FaArrowUp,
  FaArrowDown,
  FaFilter,
  FaSearch,
  FaExternalLinkAlt
} from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const slideIn = keyframes`
  from { 
    transform: translateX(-100%); 
  }
  to { 
    transform: translateX(0); 
  }
`;

const pulse = keyframes`
  0% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
  100% { 
    transform: scale(1); 
  }
`;

const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

const glow = keyframes`
  0%, 100% { 
    opacity: 1; 
  }
  50% { 
    opacity: 0.5; 
  }
`;

// Modern StatCard Component
const StatCard = ({ title, value, icon, change, changeType, subtitle, color = 'primary' }) => (
  <StatCardWrapper color={color} className="stat-card">
    <div className="stat-background">
      <div className="stat-glow"></div>
    </div>
    <div className="stat-content">
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
          <h3>{title}</h3>
          {subtitle && <span className="stat-subtitle">{subtitle}</span>}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change ${changeType}`}>
          {changeType === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
          {Math.abs(change)}% from previous period
        </div>
      )}
    </div>
  </StatCardWrapper>
);

// Fixed Dashboard Tabs - Better visibility
const DashboardTabs = ({ dashboardType, setDashboardType }) => (
  <TabsWrapper>
    <button 
      className={`tab ${dashboardType === 'overview' ? 'active' : ''}`}
      onClick={() => setDashboardType('overview')}
    >
      <FaChartBar />
      <span>Overview</span>
      <div className="tab-indicator"></div>
    </button>
    <button 
      className={`tab ${dashboardType === 'realtime' ? 'active' : ''}`}
      onClick={() => setDashboardType('realtime')}
    >
      <FaUserClock />
      <span>Real-time</span>
      <div className="tab-indicator"></div>
    </button>
    <button 
      className={`tab ${dashboardType === 'userjourney' ? 'active' : ''}`}
      onClick={() => setDashboardType('userjourney')}
    >
      <FaExchangeAlt />
      <span>User Journey</span>
      <div className="tab-indicator"></div>
    </button>
  </TabsWrapper>
);

// Fixed Export Controls - Working dropdown
const ExportControls = ({ onExport, exporting }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExportControlsWrapper>
      <div className="export-dropdown">
        <button 
          className="export-trigger" 
          onClick={() => setIsOpen(!isOpen)}
          disabled={exporting}
        >
          <FaFileExport />
          <span>{exporting ? 'Exporting...' : 'Export Data'}</span>
          <div className={`chevron ${isOpen ? 'open' : ''}`}>▼</div>
        </button>
        {isOpen && (
          <div className="export-menu">
            <button onClick={() => { onExport('sessions', 'csv'); setIsOpen(false); }}>
              <FaDownload />
              <span>Sessions Data</span>
            </button>
            <button onClick={() => { onExport('events', 'csv'); setIsOpen(false); }}>
              <FaDownload />
              <span>Events Data</span>
            </button>
            <button onClick={() => { onExport('overview', 'csv'); setIsOpen(false); }}>
              <FaDownload />
              <span>Overview Report</span>
            </button>
          </div>
        )}
      </div>
    </ExportControlsWrapper>
  );
};

// Modern Chart Card Component
const ChartCard = ({ title, children, onExport, exportData, exportTitle, className = '' }) => (
  <ChartCardWrapper className={className}>
    <div className="chart-header">
      <h3>{title}</h3>
      {onExport && exportData && (
        <button 
          className="export-btn"
          onClick={() => onExport(exportTitle, exportData)}
          title={`Export ${title}`}
        >
          <FaDownload />
        </button>
      )}
    </div>
    <div className="chart-content">
      {children}
    </div>
  </ChartCardWrapper>
);

// Table component for Top Pages
const DataTable = ({ data, columns, onExport, exportTitle }) => {
  if (!data || data.length === 0) {
    return (
      <NoDataWrapper>
        <div className="no-data-icon">📊</div>
        <p>No data available</p>
        <span>Try selecting a different time range</span>
      </NoDataWrapper>
    );
  }

  return (
    <TableWrapper>
      <div className="table-header">
        <span className="table-info">Showing {data.length} records</span>
        {onExport && (
          <button 
            className="table-export-btn"
            onClick={() => onExport(exportTitle, data)}
            title={`Export ${exportTitle}`}
          >
            <FaDownload /> Export CSV
          </button>
        )}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className || ''}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={column.className || ''}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableWrapper>
  );
};

// Overview Dashboard with Modern Design
const OverviewDashboard = ({ stats, onExportData }) => {
  const pageColumns = [
    { key: 'title', header: 'Page Title', className: 'page-title' },
    { key: 'path', header: 'URL Path', className: 'page-path' },
    { 
      key: 'views', 
      header: 'Views', 
      className: 'views',
      render: (row) => row.views?.toLocaleString() || '0'
    },
    { 
      key: 'avgDuration', 
      header: 'Avg. Time', 
      className: 'duration',
      render: (row) => `${row.avgDuration || 0}s`
    },
    { 
      key: 'avgScrollDepth', 
      header: 'Scroll Depth', 
      className: 'scroll',
      render: (row) => `${row.avgScrollDepth || 0}%`
    },
    { 
      key: 'exitRate', 
      header: 'Exit Rate', 
      className: 'exit-rate',
      render: (row) => `${row.exitRate ? row.exitRate.toFixed(1) : '0'}%`
    }
  ];

  return (
    <OverviewWrapper>
      {/* Key Metrics Grid */}
      <div className="metrics-section">
        <div className="section-header">
          <h2>Performance Overview</h2>
          <p>Key metrics for your website performance</p>
        </div>
        <div className="metrics-grid">
          <StatCard
            title="Total Sessions"
            value={stats.overview?.totalSessions?.toLocaleString() || '0'}
            icon={<FaUsers />}
            change={stats.trends?.totalSessions?.change}
            changeType={stats.trends?.totalSessions?.trend}
            color="blue"
          />
          <StatCard
            title="Unique Visitors"
            value={stats.overview?.totalVisitors?.toLocaleString() || '0'}
            icon={<FaEye />}
            change={stats.trends?.totalVisitors?.change}
            changeType={stats.trends?.totalVisitors?.trend}
            color="purple"
          />
          <StatCard
            title="Page Views"
            value={stats.overview?.totalPageViews?.toLocaleString() || '0'}
            icon={<FaMousePointer />}
            change={stats.trends?.totalPageViews?.change}
            changeType={stats.trends?.totalPageViews?.trend}
            color="green"
          />
          <StatCard
            title="Avg. Duration"
            value={stats.overview?.avgSessionDuration ? `${Math.floor(stats.overview.avgSessionDuration / 60)}m ${stats.overview.avgSessionDuration % 60}s` : '0s'}
            icon={<FaClock />}
            change={stats.trends?.avgSessionDuration?.change}
            changeType={stats.trends?.avgSessionDuration?.trend}
            color="orange"
          />
          <StatCard
            title="Bounce Rate"
            value={stats.overview?.bounceRate ? `${stats.overview.bounceRate.toFixed(1)}%` : '0%'}
            icon={<FaChartLine />}
            change={stats.trends?.bounceRate?.change}
            changeType={stats.trends?.bounceRate?.trend === 'down' ? 'positive' : 'negative'}
            subtitle="Single page sessions"
            color="red"
          />
          <StatCard
            title="Pages/Session"
            value={stats.overview?.pagesPerSession ? stats.overview.pagesPerSession.toFixed(1) : '0.0'}
            icon={<FaScroll />}
            change={stats.trends?.pagesPerSession?.change}
            changeType={stats.trends?.pagesPerSession?.trend}
            color="teal"
          />
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="analytics-section">
        <div className="section-header">
          <h2>Detailed Analytics</h2>
          <p>Deep dive into user behavior and traffic sources</p>
        </div>
        
        <div className="analytics-grid">
          {/* Top Performing Pages as Table */}
          <ChartCard 
            title="Top Performing Pages" 
            onExport={onExportData}
            exportData={stats.pagePerformance}
            exportTitle="page-performance"
            className="full-width"
          >
            <DataTable 
              data={stats.pagePerformance || []}
              columns={pageColumns}
              onExport={onExportData}
              exportTitle="page-performance"
            />
          </ChartCard>

          {/* Traffic Sources */}
          <ChartCard 
            title="Traffic Sources" 
            onExport={onExportData}
            exportData={stats.trafficSources}
            exportTitle="traffic-sources"
          >
            <div className="sources-list">
              {(stats.trafficSources || []).map((source, index) => (
                <div key={index} className="source-item">
                  <div className="source-main">
                    <div className="source-badge">{source.source?.charAt(0) || 'D'}</div>
                    <div className="source-info">
                      <span className="source-name">{source.source || 'Direct'}</span>
                      <span className="source-medium">{source.medium || '(none)'}</span>
                    </div>
                  </div>
                  <div className="source-stats">
                    <div className="stat-pair">
                      <span className="stat-value">{source.sessions}</span>
                      <span className="stat-label">sessions</span>
                    </div>
                    <div className="stat-pair">
                      <span className="stat-value">{Math.round(source.avgDuration)}s</span>
                      <span className="stat-label">avg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Geographic Distribution */}
          <ChartCard 
            title="Visitors by Country" 
            onExport={onExportData}
            exportData={stats.geographicData}
            exportTitle="geographic-data"
          >
            <div className="countries-list">
              {(stats.geographicData || []).map((country, index) => (
                <div key={index} className="country-item">
                  <div className="country-flag">🌍</div>
                  <div className="country-info">
                    <span className="country-name">{country.country}</span>
                    <div className="country-bar">
                      <div 
                        className="country-progress" 
                        style={{ 
                          width: `${(country.visitors / Math.max(...(stats.geographicData || [{visitors: 1}]).map(c => c.visitors || 1))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="country-count">{country.visitors}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Device Distribution */}
          <ChartCard 
            title="Device Distribution" 
            onExport={onExportData}
            exportData={stats.deviceStats}
            exportTitle="device-stats"
          >
            <div className="device-stats">
              {(stats.deviceStats || []).map((device, index) => (
                <div key={index} className="device-item">
                  <div className="device-icon">
                    {device.type === 'desktop' && <FaDesktop />}
                    {device.type === 'mobile' && <FaMobile />}
                    {device.type === 'tablet' && <FaTablet />}
                  </div>
                  <div className="device-info">
                    <span className="device-type">{device.type}</span>
                    <span className="device-percentage">{device.percentage?.toFixed(1)}%</span>
                  </div>
                  <div className="device-bar">
                    <div 
                      className="device-progress" 
                      style={{ width: `${device.percentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </OverviewWrapper>
  );
};

// Real-time Dashboard
const RealTimeDashboard = ({ stats, onExportData }) => (
  <RealtimeWrapper>
    <div className="realtime-header">
      <div className="header-content">
        <h2>Real-time Analytics</h2>
        <p>Live user activity and current events</p>
      </div>
      <div className="live-indicator">
        <div className="pulse-dot"></div>
        <span>LIVE</span>
      </div>
    </div>

    <div className="realtime-grid">
      <StatCard
        title="Active Visitors"
        value={stats.activeVisitors?.toLocaleString() || '0'}
        icon={<FaUserClock />}
        subtitle="Last 5 minutes"
        color="blue"
      />

      <ChartCard 
        title="Recent Page Views" 
        onExport={onExportData}
        exportData={stats.recentPageViews}
        exportTitle="recent-pages"
        className="full-width"
      >
        <div className="recent-pages">
          {(stats.recentPageViews || []).map((page, index) => (
            <div key={index} className="recent-page-item">
              <div className="page-preview">
                <div className="page-thumbnail"></div>
              </div>
              <div className="page-details">
                <span className="page-title">{page.title}</span>
                <span className="page-time">{new Date(page.lastView).toLocaleTimeString()}</span>
              </div>
              <div className="page-views">{page.views} views</div>
            </div>
          ))}
        </div>
      </ChartCard>

      <ChartCard 
        title="Current Events" 
        onExport={onExportData}
        exportData={stats.currentEvents}
        exportTitle="current-events"
      >
        <div className="current-events">
          {(stats.currentEvents || []).map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-badge">{event.count}</div>
              <span className="event-name">{event._id}</span>
            </div>
          ))}
        </div>
      </ChartCard>

      <ChartCard 
        title="Active Countries" 
        onExport={onExportData}
        exportData={stats.geographicDistribution}
        exportTitle="active-countries"
      >
        <div className="active-countries">
          {(stats.geographicDistribution || []).map((country, index) => (
            <div key={index} className="active-country-item">
              <div className="country-flag">🌍</div>
              <span className="country-name">{country._id}</span>
              <span className="country-count">{country.count} visitors</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  </RealtimeWrapper>
);

// User Journey Dashboard
const UserJourneyDashboard = ({ stats, onExportData }) => (
  <JourneyWrapper>
    <div className="journey-header">
      <div className="header-content">
        <h2>User Journey Analysis</h2>
        <p>Understand how users navigate through your website</p>
      </div>
      {stats && stats.length > 0 && (
        <button 
          className="journey-export-btn"
          onClick={() => onExportData('user-journeys', stats)}
        >
          <FaDownload /> Export Journeys
        </button>
      )}
    </div>

    <div className="journey-content">
      {(stats && stats.length > 0 ? stats : Array.from({ length: 3 }, (_, i) => ({
        sessionId: `session-${i + 1}`,
        visitorId: `visitor-${i + 1}`,
        totalDuration: Math.random() * 300 + 60,
        pageCount: Math.floor(Math.random() * 5) + 2,
        pages: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, j) => ({
          title: `Page ${j + 1}`,
          path: `/page-${j + 1}`,
          duration: Math.random() * 120 + 10,
          scrollDepth: Math.floor(Math.random() * 100)
        }))
      }))).map((session, index) => (
        <div key={index} className="session-journey">
          <div className="session-header">
            <div className="session-info">
              <span className="session-id">Session: {session.sessionId}</span>
              <span className="visitor-id">Visitor: {session.visitorId}</span>
            </div>
            <div className="session-stats">
              <span className="session-duration">
                {Math.round(session.totalDuration / 60)}m {Math.round(session.totalDuration % 60)}s
              </span>
              <span className="page-count">{session.pageCount || session.pages?.length || 0} pages</span>
            </div>
          </div>
          <div className="pages-flow">
            {session.pages?.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                <div className="page-step">
                  <div className="page-info">
                    <div className="page-number">{pageIndex + 1}</div>
                    <div className="page-details">
                      <span className="page-title">{page.title}</span>
                      <span className="page-path">{page.path}</span>
                    </div>
                    <div className="page-metrics">
                      <span className="page-duration">{Math.round(page.duration)}s</span>
                      <span className="page-scroll">{page.scrollDepth}% scroll</span>
                    </div>
                  </div>
                </div>
                {pageIndex < session.pages.length - 1 && (
                  <div className="flow-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  </JourneyWrapper>
);

// Main AnalyticsDashboard Component
const AnalyticsDashboard = () => {
  const { trackEvent } = useAnalytics();
  const [timeRange, setTimeRange] = useState('7d');
  const [dashboardType, setDashboardType] = useState('overview');
  const [stats, setStats] = useState({});
  const [realTimeStats, setRealTimeStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [realTimeLoading, setRealTimeLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadAnalyticsData();
    if (dashboardType === 'realtime') {
      loadRealTimeData();
      const interval = setInterval(loadRealTimeData, 30000);
      return () => clearInterval(interval);
    }
  }, [timeRange, dashboardType]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const endpoint = dashboardType === 'overview' 
        ? '/analytics/dashboard/advanced' 
        : '/analytics/user-journey';
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}?range=${timeRange}`,
        { withCredentials: true }
      );
      setStats(response.data.data || []);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  const loadRealTimeData = async () => {
    try {
      setRealTimeLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard/realtime`,
        { withCredentials: true }
      );
      setRealTimeStats(response.data.data || {});
    } catch (error) {
      console.error('Error loading real-time data:', error);
      setRealTimeStats({});
    } finally {
      setRealTimeLoading(false);
    }
  };

  // Fixed Export Function
  const exportData = async (type, format = 'csv') => {
    try {
      setExporting(true);
      
      let url = '';
      let filename = '';
      
      switch (type) {
        case 'sessions':
          url = `${import.meta.env.VITE_API_BASE_URL}/analytics/export/sessions?format=${format}&range=${timeRange}`;
          filename = `sessions-export-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
          break;
        case 'events':
          url = `${import.meta.env.VITE_API_BASE_URL}/analytics/export/events?format=${format}&range=${timeRange}`;
          filename = `events-export-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
          break;
        case 'overview':
          exportOverviewToCSV(stats);
          setExporting(false);
          return;
        default:
          console.error('Unknown export type:', type);
          setExporting(false);
          return;
      }

      const response = await axios.get(url, {
        withCredentials: true,
        responseType: 'blob'
      });

      // Create download link
      const blob = new Blob([response.data], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      trackEvent('export_download', {
        exportType: type,
        format: format,
        timeRange: timeRange
      });

    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // Fixed Client-side CSV export
  const exportDataSection = (sectionName, data) => {
    if (!data || data.length === 0) {
      alert('No data available to export');
      return;
    }

    try {
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${sectionName}-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      trackEvent('section_export', {
        section: sectionName,
        dataCount: data.length
      });
    } catch (error) {
      console.error('Error exporting section data:', error);
      alert('Failed to export data section');
    }
  };

  // Convert data to CSV format
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.map(header => `"${header}"`).join(','));
    
    // Add data rows
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value || '').replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  // Export overview data to CSV
  const exportOverviewToCSV = (overviewData) => {
    const csvRows = [];
    const filename = `overview-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    
    csvRows.push(['Metric', 'Value']);
    if (overviewData.overview) {
      Object.entries(overviewData.overview).forEach(([key, value]) => {
        csvRows.push([key, value]);
      });
    }
    
    const csvContent = csvRows.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3>Loading Analytics</h3>
          <p>Crunching the numbers...</p>
        </div>
      </LoadingWrapper>
    );
  }

  return (
    <DashboardWrapper>
      {/* Header */}
      <Header>
        <div className="header-main">
          <div className="header-title">
            <h1>Analytics Dashboard</h1>
            <p>Insights that drive growth</p>
          </div>
          <div className="header-controls">
            <div className="time-filter">
              <FaFilter />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="modern-select"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <ExportControls 
              onExport={exportData}
              exporting={exporting}
            />
          </div>
        </div>
        <DashboardTabs dashboardType={dashboardType} setDashboardType={setDashboardType} />
      </Header>

      {/* Main Content */}
      <MainContent>
        {dashboardType === 'overview' && (
          <OverviewDashboard stats={stats} onExportData={exportDataSection} />
        )}
        {dashboardType === 'realtime' && (
          <RealTimeDashboard 
            stats={realTimeStats} 
            onExportData={exportDataSection}
          />
        )}
        {dashboardType === 'userjourney' && (
          <UserJourneyDashboard 
            stats={stats} 
            onExportData={exportDataSection}
          />
        )}
      </MainContent>

      {/* Export Overlay */}
      {exporting && (
        <ExportOverlay>
          <div className="export-loading">
            <div className="loading-spinner"></div>
            <div className="export-text">
              <h4>Preparing Export</h4>
              <p>Your data is being processed...</p>
            </div>
          </div>
        </ExportOverlay>
      )}
    </DashboardWrapper>
  );
};

// =============================================
// STYLED COMPONENTS - ALL INCLUDED
// =============================================

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    .header-title {
      h1 {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
      
      p {
        color: #6c757d;
        margin: 0.25rem 0 0 0;
        font-size: 0.9rem;
      }
    }
    
    .header-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
      
      .time-filter {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        
        .modern-select {
          border: none;
          background: transparent;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          color: #4a5568;
        }
      }
    }
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  
  .tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    color: #6c757d;
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }
    
    &.active {
      background: #667eea;
      color: white;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      
      .tab-indicator {
        width: 100%;
      }
    }
    
    .tab-indicator {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 0;
      height: 3px;
      background: #667eea;
      transition: width 0.3s ease;
      border-radius: 2px;
    }
  }
`;

const ExportControlsWrapper = styled.div`
  .export-dropdown {
    position: relative;
    
    .export-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
      
      .chevron {
        font-size: 0.8rem;
        transition: transform 0.3s ease;
        
        &.open {
          transform: rotate(180deg);
        }
      }
    }
    
    .export-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      padding: 0.5rem;
      min-width: 200px;
      z-index: 1000;
      border: 1px solid #e2e8f0;
      animation: ${fadeIn} 0.2s ease-out;
      
      button {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        background: none;
        border: none;
        border-radius: 8px;
        color: #4a5568;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9rem;
        
        &:hover {
          background: #f7fafc;
          color: #667eea;
        }
        
        svg {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
  min-height: calc(100vh - 140px);
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  
  .loading-content {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
      margin: 0 auto 1.5rem;
    }
    
    h3 {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    
    p {
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
  }
`;

const StatCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .stat-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    overflow: hidden;
    
    .stat-glow {
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: ${props => {
        switch(props.color) {
          case 'blue': return 'linear-gradient(135deg, #667eea, #764ba2)';
          case 'purple': return 'linear-gradient(135deg, #764ba2, #667eea)';
          case 'green': return 'linear-gradient(135deg, #48bb78, #38a169)';
          case 'orange': return 'linear-gradient(135deg, #ed8936, #dd6b20)';
          case 'red': return 'linear-gradient(135deg, #f56565, #e53e3e)';
          case 'teal': return 'linear-gradient(135deg, #38b2ac, #319795)';
          default: return 'linear-gradient(135deg, #667eea, #764ba2)';
        }
      }};
      border-radius: 50%;
      animation: ${glow} 3s ease-in-out infinite;
    }
  }
  
  .stat-content {
    position: relative;
    z-index: 2;
    
    .stat-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      
      .stat-icon {
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: white;
        backdrop-filter: blur(10px);
      }
      
      .stat-info {
        h3 {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .stat-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.75rem;
        }
      }
    }
    
    .stat-value {
      color: white;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .stat-change {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 500;
      
      &.positive {
        color: #48bb78;
      }
      
      &.negative {
        color: #f56565;
      }
      
      svg {
        font-size: 0.7rem;
      }
    }
  }
`;

const ChartCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
  
  &.full-width {
    grid-column: 1 / -1;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h3 {
      color: #2d3748;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }
    
    .export-btn {
      width: 36px;
      height: 36px;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: #667eea;
        color: white;
        border-color: #667eea;
        transform: translateY(-1px);
      }
    }
  }
  
  .chart-content {
    // Content styles will be defined in specific components
  }
`;

const OverviewWrapper = styled.div`
  .metrics-section {
    margin-bottom: 3rem;
    
    .section-header {
      margin-bottom: 2rem;
      
      h2 {
        color: white;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 1rem;
      }
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  }
  
  .analytics-section {
    .section-header {
      margin-bottom: 2rem;
      
      h2 {
        color: white;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 1rem;
      }
    }
    
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }
    
    .sources-list {
      .source-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        transition: background-color 0.2s ease;
        
        &:last-child {
          border-bottom: none;
        }
        
        &:hover {
          background: #f7fafc;
          border-radius: 8px;
        }
        
        .source-main {
          display: flex;
          align-items: center;
          gap: 1rem;
          
          .source-badge {
            width: 40px;
            height: 40px;
            background: #667eea;
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
          }
          
          .source-info {
            .source-name {
              display: block;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 0.25rem;
            }
            
            .source-medium {
              display: block;
              font-size: 0.8rem;
              color: #6c757d;
            }
          }
        }
        
        .source-stats {
          display: flex;
          gap: 1.5rem;
          
          .stat-pair {
            text-align: center;
            
            .stat-value {
              display: block;
              font-weight: 600;
              color: #2d3748;
              font-size: 1.1rem;
            }
            
            .stat-label {
              display: block;
              font-size: 0.7rem;
              color: #6c757d;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
          }
        }
      }
    }
    
    .countries-list {
      .country-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e2e8f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .country-flag {
          font-size: 1.2rem;
        }
        
        .country-info {
          flex: 1;
          
          .country-name {
            display: block;
            font-weight: 500;
            color: #2d3748;
            margin-bottom: 0.25rem;
          }
          
          .country-bar {
            width: 100%;
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
            
            .country-progress {
              height: 100%;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 3px;
              transition: width 0.3s ease;
            }
          }
        }
        
        .country-count {
          font-weight: 600;
          color: #4a5568;
          min-width: 60px;
          text-align: right;
        }
      }
    }
    
    .device-stats {
      .device-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid #e2e8f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .device-icon {
          width: 40px;
          height: 40px;
          background: #f7fafc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          font-size: 1.1rem;
        }
        
        .device-info {
          flex: 1;
          
          .device-type {
            display: block;
            font-weight: 500;
            color: #2d3748;
            text-transform: capitalize;
            margin-bottom: 0.25rem;
          }
          
          .device-percentage {
            display: block;
            font-size: 0.8rem;
            color: #6c757d;
          }
        }
        
        .device-bar {
          width: 100px;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
          
          .device-progress {
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 3px;
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
`;

const RealtimeWrapper = styled.div`
  .realtime-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    .header-content {
      h2 {
        color: white;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 1rem;
      }
    }
    
    .live-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(239, 68, 68, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      color: #f56565;
      font-weight: 600;
      font-size: 0.8rem;
      border: 1px solid rgba(239, 68, 68, 0.3);
      
      .pulse-dot {
        width: 8px;
        height: 8px;
        background: #f56565;
        border-radius: 50%;
        animation: ${pulse} 2s infinite;
      }
    }
  }
  
  .realtime-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .recent-pages {
      .recent-page-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        transition: background-color 0.2s ease;
        
        &:last-child {
          border-bottom: none;
        }
        
        &:hover {
          background: #f7fafc;
          border-radius: 8px;
        }
        
        .page-preview {
          .page-thumbnail {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px;
            opacity: 0.7;
          }
        }
        
        .page-details {
          flex: 1;
          
          .page-title {
            display: block;
            font-weight: 500;
            color: #2d3748;
            margin-bottom: 0.25rem;
          }
          
          .page-time {
            display: block;
            font-size: 0.8rem;
            color: #6c757d;
          }
        }
        
        .page-views {
          font-weight: 600;
          color: #667eea;
          background: #f7fafc;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
        }
      }
    }
    
    .current-events {
      .event-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .event-badge {
          width: 30px;
          height: 30px;
          background: #667eea;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .event-name {
          flex: 1;
          font-weight: 500;
          color: #2d3748;
          text-transform: capitalize;
        }
      }
    }
    
    .active-countries {
      .active-country-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        border-bottom: 1px solid #e2e8f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .country-flag {
          font-size: 1.2rem;
        }
        
        .country-name {
          flex: 1;
          font-weight: 500;
          color: #2d3748;
        }
        
        .country-count {
          font-weight: 600;
          color: #667eea;
          background: #f7fafc;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const JourneyWrapper = styled.div`
  .journey-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    .header-content {
      h2 {
        color: white;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 1rem;
      }
    }
    
    .journey-export-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
    }
  }
  
  .journey-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .session-journey {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeIn} 0.6s ease-out;
    
    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
      
      .session-info {
        .session-id {
          display: block;
          font-weight: 600;
          color: #2d3748;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .visitor-id {
          display: block;
          font-size: 0.8rem;
          color: #6c757d;
          font-family: monospace;
        }
      }
      
      .session-stats {
        display: flex;
        gap: 1rem;
        
        .session-duration, .page-count {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
      }
    }
    
    .pages-flow {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      
      .page-step {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .page-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f7fafc;
          padding: 1rem;
          border-radius: 12px;
          min-width: 250px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .page-number {
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.8rem;
            flex-shrink: 0;
          }
          
          .page-details {
            flex: 1;
            
            .page-title {
              display: block;
              font-weight: 600;
              color: #2d3748;
              margin-bottom: 0.25rem;
            }
            
            .page-path {
              display: block;
              font-size: 0.8rem;
              color: #667eea;
              font-family: monospace;
            }
          }
          
          .page-metrics {
            text-align: right;
            
            .page-duration, .page-scroll {
              display: block;
              font-size: 0.8rem;
              color: #6c757d;
            }
            
            .page-duration {
              font-weight: 600;
              color: #2d3748;
            }
          }
        }
        
        .flow-arrow {
          color: #a0aec0;
          font-weight: bold;
          font-size: 1.2rem;
          animation: ${pulse} 2s infinite;
        }
      }
    }
  }
`;

const TableWrapper = styled.div`
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
    
    .table-info {
      color: #6c757d;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .table-export-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: linear-gradient(135deg, #5a6fd8, #6a51a3);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
    }
  }
  
  .table-container {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: white;
    
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
      
      th {
        background: #f8f9fa;
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: #4a5568;
        border-bottom: 2px solid #e2e8f0;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        
        &.page-title, &.page-path, &.views, &.duration, &.scroll, &.exit-rate {
          // Specific column styles
        }
      }
      
      td {
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        font-size: 0.9rem;
        
        &.page-title {
          font-weight: 500;
          color: #2d3748;
        }
        
        &.page-path {
          color: #667eea;
          font-family: monospace;
          font-size: 0.85rem;
        }
        
        &.views, &.duration, &.scroll, &.exit-rate {
          text-align: right;
          font-weight: 600;
          color: #4a5568;
          font-family: monospace;
        }
      }
      
      tr {
        transition: background-color 0.2s ease;
        
        &.even {
          background: #fafafa;
        }
        
        &.odd {
          background: white;
        }
        
        &:hover {
          background: #f7fafc;
        }
        
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
`;

const NoDataWrapper = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  
  .no-data-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  span {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const ExportOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  
  .export-loading {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    min-width: 300px;
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #e2e8f0;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
    }
    
    .export-text {
      h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.1rem;
      }
      
      p {
        margin: 0;
        color: #6c757d;
        font-size: 0.9rem;
      }
    }
  }
`;

export default AnalyticsDashboard;

































































// // components/AnalyticsDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { useAnalytics } from '../context/AnalyticsContext';
// import styled, { keyframes } from 'styled-components';
// import axios from 'axios';
// import {
//   FaUsers,
//   FaEye,
//   FaClock,
//   FaGlobeAmericas,
//   FaDesktop,
//   FaMobile,
//   FaTablet,
//   FaChartLine,
//   FaMousePointer,
//   FaScroll,
//   FaFileDownload,
//   FaVideo,
//   FaExchangeAlt,
//   FaUserClock,
//   FaChartBar,
//   FaMapMarkerAlt,
//   FaNetworkWired,
//   FaDownload,
//   FaFileExport,
//   FaArrowUp,
//   FaArrowDown,
//   FaFilter,
//   FaSearch
// } from 'react-icons/fa';

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const slideIn = keyframes`
//   from { transform: translateX(-100%); }
//   to { transform: translateX(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // Modern StatCard Component
// const StatCard = ({ title, value, icon, change, changeType, subtitle, color = 'primary' }) => (
//   <StatCardWrapper color={color} className="stat-card">
//     <div className="stat-background">
//       <div className="stat-glow"></div>
//     </div>
//     <div className="stat-content">
//       <div className="stat-header">
//         <div className="stat-icon">{icon}</div>
//         <div className="stat-info">
//           <h3>{title}</h3>
//           {subtitle && <span className="stat-subtitle">{subtitle}</span>}
//         </div>
//       </div>
//       <div className="stat-value">{value}</div>
//       {change && (
//         <div className={`stat-change ${changeType}`}>
//           {changeType === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
//           {Math.abs(change)}% from previous period
//         </div>
//       )}
//     </div>
//   </StatCardWrapper>
// );

// // Modern Dashboard Tabs
// const DashboardTabs = ({ dashboardType, setDashboardType }) => (
//   <TabsWrapper>
//     <button 
//       className={`tab ${dashboardType === 'overview' ? 'active' : ''}`}
//       onClick={() => setDashboardType('overview')}
//     >
//       <FaChartBar />
//       <span>Overview</span>
//       <div className="tab-indicator"></div>
//     </button>
//     <button 
//       className={`tab ${dashboardType === 'realtime' ? 'active' : ''}`}
//       onClick={() => setDashboardType('realtime')}
//     >
//       <FaUserClock />
//       <span>Real-time</span>
//       <div className="tab-indicator"></div>
//     </button>
//     <button 
//       className={`tab ${dashboardType === 'userjourney' ? 'active' : ''}`}
//       onClick={() => setDashboardType('userjourney')}
//     >
//       <FaExchangeAlt />
//       <span>Journey</span>
//       <div className="tab-indicator"></div>
//     </button>
//   </TabsWrapper>
// );

// // Modern Export Controls
// const ExportControls = ({ dashboardType, timeRange, onExport, exporting }) => (
//   <ExportControlsWrapper>
//     <div className="export-dropdown">
//       <button className="export-trigger" disabled={exporting}>
//         <FaFileExport />
//         <span>{exporting ? 'Exporting...' : 'Export Data'}</span>
//         <div className="chevron">▼</div>
//       </button>
//       <div className="export-menu">
//         <button onClick={() => onExport('sessions', 'csv')}>
//           <FaDownload />
//           <span>Sessions Data</span>
//         </button>
//         <button onClick={() => onExport('events', 'csv')}>
//           <FaDownload />
//           <span>Events Data</span>
//         </button>
//         {dashboardType === 'overview' && (
//           <button onClick={() => onExport('overview', 'csv')}>
//             <FaDownload />
//             <span>Overview Report</span>
//           </button>
//         )}
//       </div>
//     </div>
//   </ExportControlsWrapper>
// );

// // Modern Chart Card Component
// const ChartCard = ({ title, children, onExport, exportData, exportTitle }) => (
//   <ChartCardWrapper>
//     <div className="chart-header">
//       <h3>{title}</h3>
//       <div className="chart-actions">
//         {onExport && (
//           <button 
//             className="export-btn"
//             onClick={() => onExport(exportTitle, exportData)}
//             title={`Export ${title}`}
//           >
//             <FaDownload />
//           </button>
//         )}
//       </div>
//     </div>
//     <div className="chart-content">
//       {children}
//     </div>
//   </ChartCardWrapper>
// );

// // Overview Dashboard with Modern Design
// const OverviewDashboard = ({ stats, onExportData }) => (
//   <OverviewWrapper>
//     {/* Key Metrics Grid */}
//     <div className="metrics-section">
//       <div className="section-header">
//         <h2>Performance Overview</h2>
//         <p>Key metrics for your website performance</p>
//       </div>
//       <div className="metrics-grid">
//         <StatCard
//           title="Total Sessions"
//           value={stats.overview?.totalSessions?.toLocaleString() || '0'}
//           icon={<FaUsers />}
//           change={stats.trends?.totalSessions?.change}
//           changeType={stats.trends?.totalSessions?.trend}
//           color="blue"
//         />
//         <StatCard
//           title="Unique Visitors"
//           value={stats.overview?.totalVisitors?.toLocaleString() || '0'}
//           icon={<FaEye />}
//           change={stats.trends?.totalVisitors?.change}
//           changeType={stats.trends?.totalVisitors?.trend}
//           color="purple"
//         />
//         <StatCard
//           title="Page Views"
//           value={stats.overview?.totalPageViews?.toLocaleString() || '0'}
//           icon={<FaMousePointer />}
//           change={stats.trends?.totalPageViews?.change}
//           changeType={stats.trends?.totalPageViews?.trend}
//           color="green"
//         />
//         <StatCard
//           title="Avg. Duration"
//           value={stats.overview?.avgSessionDuration ? `${Math.floor(stats.overview.avgSessionDuration / 60)}m ${stats.overview.avgSessionDuration % 60}s` : '0s'}
//           icon={<FaClock />}
//           change={stats.trends?.avgSessionDuration?.change}
//           changeType={stats.trends?.avgSessionDuration?.trend}
//           color="orange"
//         />
//         <StatCard
//           title="Bounce Rate"
//           value={stats.overview?.bounceRate ? `${stats.overview.bounceRate.toFixed(1)}%` : '0%'}
//           icon={<FaChartLine />}
//           change={stats.trends?.bounceRate?.change}
//           changeType={stats.trends?.bounceRate?.trend === 'down' ? 'positive' : 'negative'}
//           subtitle="Single page sessions"
//           color="red"
//         />
//         <StatCard
//           title="Pages/Session"
//           value={stats.overview?.pagesPerSession ? stats.overview.pagesPerSession.toFixed(1) : '0.0'}
//           icon={<FaScroll />}
//           change={stats.trends?.pagesPerSession?.change}
//           changeType={stats.trends?.pagesPerSession?.trend}
//           color="teal"
//         />
//       </div>
//     </div>

//     {/* Detailed Analytics */}
//     <div className="analytics-section">
//       <div className="section-header">
//         <h2>Detailed Analytics</h2>
//         <p>Deep dive into user behavior and traffic sources</p>
//       </div>
      
//       <div className="analytics-grid">
//         {/* Traffic Sources */}
//         <ChartCard 
//           title="Traffic Sources" 
//           onExport={onExportData}
//           exportData={stats.trafficSources}
//           exportTitle="traffic-sources"
//         >
//           <div className="sources-list">
//             {stats.trafficSources?.map((source, index) => (
//               <div key={index} className="source-item">
//                 <div className="source-main">
//                   <div className="source-badge">{source.source?.charAt(0) || 'D'}</div>
//                   <div className="source-info">
//                     <span className="source-name">{source.source || 'Direct'}</span>
//                     <span className="source-medium">{source.medium || '(none)'}</span>
//                   </div>
//                 </div>
//                 <div className="source-stats">
//                   <div className="stat-pair">
//                     <span className="stat-value">{source.sessions}</span>
//                     <span className="stat-label">sessions</span>
//                   </div>
//                   <div className="stat-pair">
//                     <span className="stat-value">{Math.round(source.avgDuration)}s</span>
//                     <span className="stat-label">avg</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ChartCard>

//         {/* Top Performing Pages */}
//         <ChartCard 
//           title="Top Pages" 
//           onExport={onExportData}
//           exportData={stats.pagePerformance}
//           exportTitle="page-performance"
//         >
//           <div className="pages-list">
//             {stats.pagePerformance?.map((page, index) => (
//               <div key={index} className="page-item">
//                 <div className="page-rank">{index + 1}</div>
//                 <div className="page-info">
//                   <span className="page-title">{page.title}</span>
//                   <span className="page-path">{page.path}</span>
//                 </div>
//                 <div className="page-stats">
//                   <div className="page-metric">
//                     <FaEye />
//                     <span>{page.views}</span>
//                   </div>
//                   <div className="page-metric">
//                     <FaClock />
//                     <span>{page.avgDuration}s</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ChartCard>

//         {/* Geographic Distribution */}
//         <ChartCard 
//           title="Visitors by Country" 
//           onExport={onExportData}
//           exportData={stats.geographicData}
//           exportTitle="geographic-data"
//         >
//           <div className="countries-list">
//             {stats.geographicData?.map((country, index) => (
//               <div key={index} className="country-item">
//                 <div className="country-flag">🌍</div>
//                 <div className="country-info">
//                   <span className="country-name">{country.country}</span>
//                   <div className="country-bar">
//                     <div 
//                       className="country-progress" 
//                       style={{ width: `${(country.visitors / Math.max(...stats.geographicData.map(c => c.visitors))) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//                 <span className="country-count">{country.visitors}</span>
//               </div>
//             ))}
//           </div>
//         </ChartCard>

//         {/* Device Distribution */}
//         <ChartCard 
//           title="Device Distribution" 
//           onExport={onExportData}
//           exportData={stats.deviceStats}
//           exportTitle="device-stats"
//         >
//           <div className="device-stats">
//             {stats.deviceStats?.map((device, index) => (
//               <div key={index} className="device-item">
//                 <div className="device-icon">
//                   {device.type === 'desktop' && <FaDesktop />}
//                   {device.type === 'mobile' && <FaMobile />}
//                   {device.type === 'tablet' && <FaTablet />}
//                 </div>
//                 <div className="device-info">
//                   <span className="device-type">{device.type}</span>
//                   <span className="device-percentage">{device.percentage?.toFixed(1)}%</span>
//                 </div>
//                 <div className="device-bar">
//                   <div 
//                     className="device-progress" 
//                     style={{ width: `${device.percentage}%` }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ChartCard>
//       </div>
//     </div>
//   </OverviewWrapper>
// );

// // Real-time Dashboard
// const RealTimeDashboard = ({ stats, loading, onExportData }) => (
//   <RealtimeWrapper>
//     <div className="realtime-header">
//       <div className="header-content">
//         <h2>Real-time Analytics</h2>
//         <p>Live user activity and current events</p>
//       </div>
//       <div className="live-indicator">
//         <div className="pulse-dot"></div>
//         <span>LIVE</span>
//       </div>
//     </div>

//     <div className="realtime-grid">
//       <StatCard
//         title="Active Visitors"
//         value={stats.activeVisitors?.toLocaleString() || '0'}
//         icon={<FaUserClock />}
//         subtitle="Last 5 minutes"
//         color="blue"
//       />

//       <ChartCard 
//         title="Recent Page Views" 
//         onExport={onExportData}
//         exportData={stats.recentPageViews}
//         exportTitle="recent-pages"
//         className="full-width"
//       >
//         <div className="recent-pages">
//           {stats.recentPageViews?.map((page, index) => (
//             <div key={index} className="recent-page-item">
//               <div className="page-preview"></div>
//               <div className="page-details">
//                 <span className="page-title">{page.title}</span>
//                 <span className="page-time">{new Date(page.lastView).toLocaleTimeString()}</span>
//               </div>
//               <div className="page-views">{page.views} views</div>
//             </div>
//           ))}
//         </div>
//       </ChartCard>

//       <ChartCard 
//         title="Current Events" 
//         onExport={onExportData}
//         exportData={stats.currentEvents}
//         exportTitle="current-events"
//       >
//         <div className="current-events">
//           {stats.currentEvents?.map((event, index) => (
//             <div key={index} className="event-item">
//               <div className="event-badge">{event.count}</div>
//               <span className="event-name">{event._id}</span>
//             </div>
//           ))}
//         </div>
//       </ChartCard>
//     </div>
//   </RealtimeWrapper>
// );

// // Main AnalyticsDashboard Component
// const AnalyticsDashboard = () => {
//   const { trackEvent } = useAnalytics();
//   const [timeRange, setTimeRange] = useState('7d');
//   const [dashboardType, setDashboardType] = useState('overview');
//   const [stats, setStats] = useState({});
//   const [realTimeStats, setRealTimeStats] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [realTimeLoading, setRealTimeLoading] = useState(false);
//   const [exporting, setExporting] = useState(false);

//   useEffect(() => {
//     loadAnalyticsData();
//     if (dashboardType === 'realtime') {
//       loadRealTimeData();
//       const interval = setInterval(loadRealTimeData, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [timeRange, dashboardType]);

//   const loadAnalyticsData = async () => {
//     try {
//       setLoading(true);
//       const endpoint = dashboardType === 'overview' 
//         ? '/analytics/dashboard/advanced' 
//         : '/analytics/user-journey';
      
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}${endpoint}?range=${timeRange}`,
//         { withCredentials: true }
//       );
//       setStats(response.data.data);
//     } catch (error) {
//       console.error('Error loading analytics:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadRealTimeData = async () => {
//     try {
//       setRealTimeLoading(true);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard/realtime`,
//         { withCredentials: true }
//       );
//       setRealTimeStats(response.data.data);
//     } catch (error) {
//       console.error('Error loading real-time data:', error);
//     } finally {
//       setRealTimeLoading(false);
//     }
//   };

//   const exportData = async (type, format = 'csv') => {
//     try {
//       setExporting(true);
//       // ... export logic (same as before)
//     } catch (error) {
//       console.error('Error exporting data:', error);
//     } finally {
//       setExporting(false);
//     }
//   };

//   const exportDataSection = (sectionName, data) => {
//     // ... export section logic (same as before)
//   };

//   if (loading) {
//     return (
//       <LoadingWrapper>
//         <div className="loading-content">
//           <div className="loading-spinner"></div>
//           <h3>Loading Analytics</h3>
//           <p>Crunching the numbers...</p>
//         </div>
//       </LoadingWrapper>
//     );
//   }

//   return (
//     <DashboardWrapper>
//       {/* Header */}
//       <Header>
//         <div className="header-main">
//           <div className="header-title">
//             <h1>Analytics Dashboard</h1>
//             <p>Insights that drive growth</p>
//           </div>
//           <div className="header-controls">
//             <div className="time-filter">
//               <FaFilter />
//               <select 
//                 value={timeRange} 
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="modern-select"
//               >
//                 <option value="1d">Last 24 Hours</option>
//                 <option value="7d">Last 7 Days</option>
//                 <option value="30d">Last 30 Days</option>
//                 <option value="90d">Last 90 Days</option>
//               </select>
//             </div>
//             <ExportControls 
//               dashboardType={dashboardType}
//               timeRange={timeRange}
//               onExport={exportData}
//               exporting={exporting}
//             />
//           </div>
//         </div>
//         <DashboardTabs dashboardType={dashboardType} setDashboardType={setDashboardType} />
//       </Header>

//       {/* Main Content */}
//       <MainContent>
//         {dashboardType === 'overview' && (
//           <OverviewDashboard stats={stats} onExportData={exportDataSection} />
//         )}
//         {dashboardType === 'realtime' && (
//           <RealTimeDashboard 
//             stats={realTimeStats} 
//             loading={realTimeLoading}
//             onExportData={exportDataSection}
//           />
//         )}
//         {/* Add UserJourneyDashboard component similarly */}
//       </MainContent>
//     </DashboardWrapper>
//   );
// };

// // Modern Styled Components
// const DashboardWrapper = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 0;
// `;

// const Header = styled.header`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(20px);
//   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//   padding: 1.5rem 2rem;
  
//   .header-main {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1.5rem;
    
//     .header-title {
//       h1 {
//         font-size: 2rem;
//         font-weight: 700;
//         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//         margin: 0;
//       }
      
//       p {
//         color: #6c757d;
//         margin: 0.25rem 0 0 0;
//         font-size: 0.9rem;
//       }
//     }
    
//     .header-controls {
//       display: flex;
//       gap: 1rem;
//       align-items: center;
      
//       .time-filter {
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         background: white;
//         padding: 0.5rem 1rem;
//         border-radius: 12px;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        
//         .modern-select {
//           border: none;
//           background: transparent;
//           font-weight: 500;
//           cursor: pointer;
//           outline: none;
//         }
//       }
//     }
//   }
// `;

// const MainContent = styled.main`
//   padding: 2rem;
//   animation: ${fadeIn} 0.6s ease-out;
// `;

// const LoadingWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 60vh;
  
//   .loading-content {
//     text-align: center;
    
//     .loading-spinner {
//       width: 50px;
//       height: 50px;
//       border: 3px solid rgba(255, 255, 255, 0.3);
//       border-top: 3px solid #667eea;
//       border-radius: 50%;
//       animation: spin 1s linear infinite;
//       margin: 0 auto 1rem;
//     }
    
//     h3 {
//       color: white;
//       margin-bottom: 0.5rem;
//     }
    
//     p {
//       color: rgba(255, 255, 255, 0.7);
//     }
//   }
// `;

// const StatCardWrapper = styled.div`
//   background: rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(20px);
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 20px;
//   padding: 1.5rem;
//   position: relative;
//   overflow: hidden;
//   transition: all 0.3s ease;
//   animation: ${fadeIn} 0.6s ease-out;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//   }
  
//   .stat-background {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     opacity: 0.1;
    
//     .stat-glow {
//       position: absolute;
//       top: -50%;
//       right: -50%;
//       width: 100%;
//       height: 100%;
//       background: ${props => {
//         switch(props.color) {
//           case 'blue': return 'linear-gradient(135deg, #667eea, #764ba2)';
//           case 'purple': return 'linear-gradient(135deg, #764ba2, #667eea)';
//           case 'green': return 'linear-gradient(135deg, #48bb78, #38a169)';
//           case 'orange': return 'linear-gradient(135deg, #ed8936, #dd6b20)';
//           case 'red': return 'linear-gradient(135deg, #f56565, #e53e3e)';
//           case 'teal': return 'linear-gradient(135deg, #38b2ac, #319795)';
//           default: return 'linear-gradient(135deg, #667eea, #764ba2)';
//         }
//       }};
//       border-radius: 50%;
//     }
//   }
  
//   .stat-content {
//     position: relative;
//     z-index: 2;
    
//     .stat-header {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       margin-bottom: 1rem;
      
//       .stat-icon {
//         width: 50px;
//         height: 50px;
//         background: rgba(255, 255, 255, 0.2);
//         border-radius: 12px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 1.2rem;
//         color: white;
//       }
      
//       .stat-info {
//         h3 {
//           color: rgba(255, 255, 255, 0.9);
//           font-size: 0.9rem;
//           font-weight: 600;
//           margin: 0;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
        
//         .stat-subtitle {
//           color: rgba(255, 255, 255, 0.6);
//           font-size: 0.75rem;
//         }
//       }
//     }
    
//     .stat-value {
//       color: white;
//       font-size: 2rem;
//       font-weight: 700;
//       margin-bottom: 0.5rem;
//     }
    
//     .stat-change {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.8rem;
//       font-weight: 500;
      
//       &.positive {
//         color: #48bb78;
//       }
      
//       &.negative {
//         color: #f56565;
//       }
//     }
//   }
// `;

// const TabsWrapper = styled.div`
//   display: flex;
//   gap: 0.5rem;
  
//   .tab {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     padding: 0.75rem 1.5rem;
//     background: transparent;
//     border: none;
//     color: #6c757d;
//     font-weight: 500;
//     border-radius: 12px;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     position: relative;
    
//     &:hover {
//       background: rgba(102, 126, 234, 0.1);
//       color: #667eea;
//     }
    
//     &.active {
//       background: rgba(255, 255, 255, 0.2);
//       color: white;
      
//       .tab-indicator {
//         width: 100%;
//       }
//     }
    
//     .tab-indicator {
//       position: absolute;
//       bottom: -1px;
//       left: 0;
//       width: 0;
//       height: 2px;
//       background: linear-gradient(135deg, #667eea, #764ba2);
//       transition: width 0.3s ease;
//     }
//   }
// `;

// const ExportControlsWrapper = styled.div`
//   .export-dropdown {
//     position: relative;
    
//     .export-trigger {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       padding: 0.75rem 1.5rem;
//       background: linear-gradient(135deg, #667eea, #764ba2);
//       color: white;
//       border: none;
//       border-radius: 12px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.3s ease;
      
//       &:hover:not(:disabled) {
//         transform: translateY(-2px);
//         box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
//       }
      
//       &:disabled {
//         opacity: 0.7;
//         cursor: not-allowed;
//       }
      
//       .chevron {
//         font-size: 0.8rem;
//         transition: transform 0.3s ease;
//       }
//     }
    
//     .export-menu {
//       position: absolute;
//       top: 100%;
//       right: 0;
//       margin-top: 0.5rem;
//       background: white;
//       border-radius: 12px;
//       box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//       padding: 0.5rem;
//       min-width: 200px;
//       opacity: 0;
//       visibility: hidden;
//       transform: translateY(-10px);
//       transition: all 0.3s ease;
      
//       button {
//         display: flex;
//         align-items: center;
//         gap: 0.75rem;
//         width: 100%;
//         padding: 0.75rem 1rem;
//         background: none;
//         border: none;
//         border-radius: 8px;
//         color: #4a5568;
//         cursor: pointer;
//         transition: all 0.2s ease;
        
//         &:hover {
//           background: #f7fafc;
//           color: #667eea;
//         }
//       }
//     }
    
//     &:hover .export-menu {
//       opacity: 1;
//       visibility: visible;
//       transform: translateY(0);
//     }
//   }
// `;

// const ChartCardWrapper = styled.div`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(20px);
//   border-radius: 20px;
//   padding: 1.5rem;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//   border: 1px solid rgba(255, 255, 255, 0.2);
  
//   .chart-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 1.5rem;
    
//     h3 {
//       color: #2d3748;
//       font-size: 1.1rem;
//       font-weight: 600;
//       margin: 0;
//     }
    
//     .chart-actions {
//       .export-btn {
//         width: 36px;
//         height: 36px;
//         background: #f7fafc;
//         border: 1px solid #e2e8f0;
//         border-radius: 10px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: #4a5568;
//         cursor: pointer;
//         transition: all 0.2s ease;
        
//         &:hover {
//           background: #667eea;
//           color: white;
//           border-color: #667eea;
//         }
//       }
//     }
//   }
  
//   .chart-content {
//     // Add specific chart content styles
//   }
// `;

// const OverviewWrapper = styled.div`
//   .metrics-section {
//     margin-bottom: 2rem;
    
//     .section-header {
//       margin-bottom: 1.5rem;
      
//       h2 {
//         color: white;
//         font-size: 1.5rem;
//         font-weight: 600;
//         margin: 0 0 0.5rem 0;
//       }
      
//       p {
//         color: rgba(255, 255, 255, 0.7);
//         margin: 0;
//       }
//     }
    
//     .metrics-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//       gap: 1.5rem;
//     }
//   }
  
//   .analytics-section {
//     .analytics-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//       gap: 1.5rem;
//     }
//   }
// `;

// const RealtimeWrapper = styled.div`
//   .realtime-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 2rem;
    
//     .header-content {
//       h2 {
//         color: white;
//         font-size: 1.5rem;
//         font-weight: 600;
//         margin: 0 0 0.5rem 0;
//       }
      
//       p {
//         color: rgba(255, 255, 255, 0.7);
//         margin: 0;
//       }
//     }
    
//     .live-indicator {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       background: rgba(239, 68, 68, 0.2);
//       padding: 0.5rem 1rem;
//       border-radius: 20px;
//       color: #f56565;
//       font-weight: 600;
//       font-size: 0.8rem;
      
//       .pulse-dot {
//         width: 8px;
//         height: 8px;
//         background: #f56565;
//         border-radius: 50%;
//         animation: ${pulse} 2s infinite;
//       }
//     }
//   }
  
//   .realtime-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     gap: 1.5rem;
    
//     .full-width {
//       grid-column: 1 / -1;
//     }
//   }
// `;

// export default AnalyticsDashboard;















































































// // // components/AnalyticsDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useAnalytics } from '../context/AnalyticsContext';
// // import styled from 'styled-components';
// // import axios from 'axios';
// // import {
// //   FaUsers,
// //   FaEye,
// //   FaClock,
// //   FaGlobeAmericas,
// //   FaDesktop,
// //   FaMobile,
// //   FaTablet,
// //   FaChartLine,
// //   FaMousePointer,
// //   FaScroll,
// //   FaFileDownload,
// //   FaVideo,
// //   FaExchangeAlt,
// //   FaUserClock,
// //   FaChartBar,
// //   FaMapMarkerAlt,
// //   FaNetworkWired,
// //   FaDownload,
// //   FaFileExport
// // } from 'react-icons/fa';

// // // Move StatCard component outside of AnalyticsDashboard
// // const StatCard = ({ title, value, icon, change, changeType, subtitle }) => (
// //   <StatCardWrapper>
// //     <div className="stat-icon">{icon}</div>
// //     <div className="stat-content">
// //       <h3>{title}</h3>
// //       <div className="stat-value">{value}</div>
// //       {subtitle && <div className="stat-subtitle">{subtitle}</div>}
// //       {change && (
// //         <div className={`stat-change ${changeType}`}>
// //           {change > 0 ? '+' : ''}{change}% from previous period
// //         </div>
// //       )}
// //     </div>
// //   </StatCardWrapper>
// // );

// // // Move DashboardTabs component outside
// // const DashboardTabs = ({ dashboardType, setDashboardType }) => (
// //   <TabsWrapper>
// //     <button 
// //       className={dashboardType === 'overview' ? 'active' : ''}
// //       onClick={() => setDashboardType('overview')}
// //     >
// //       <FaChartBar /> Overview
// //     </button>
// //     <button 
// //       className={dashboardType === 'realtime' ? 'active' : ''}
// //       onClick={() => setDashboardType('realtime')}
// //     >
// //       <FaUserClock /> Real-time
// //     </button>
// //     <button 
// //       className={dashboardType === 'userjourney' ? 'active' : ''}
// //       onClick={() => setDashboardType('userjourney')}
// //     >
// //       <FaExchangeAlt /> User Journey
// //     </button>
// //   </TabsWrapper>
// // );

// // // Export Controls Component
// // const ExportControls = ({ dashboardType, timeRange, onExport }) => (
// //   <ExportControlsWrapper>
// //     <button 
// //       className="export-btn"
// //       onClick={() => onExport('sessions', 'csv')}
// //       title="Export Sessions as CSV"
// //     >
// //       <FaFileExport /> Export Sessions
// //     </button>
// //     <button 
// //       className="export-btn"
// //       onClick={() => onExport('events', 'csv')}
// //       title="Export Events as CSV"
// //     >
// //       <FaFileExport /> Export Events
// //     </button>
// //     {dashboardType === 'overview' && (
// //       <button 
// //         className="export-btn"
// //         onClick={() => onExport('overview', 'csv')}
// //         title="Export Overview Data as CSV"
// //       >
// //         <FaDownload /> Export Overview
// //       </button>
// //     )}
// //   </ExportControlsWrapper>
// // );

// // // Move sub-dashboard components outside
// // const OverviewDashboard = ({ stats, onExportData }) => (
// //   <>
// //     {/* Key Metrics Grid */}
// //     <div className="metrics-grid">
// //       <StatCard
// //         title="Total Sessions"
// //         value={stats.overview?.totalSessions?.toLocaleString()}
// //         icon={<FaUsers />}
// //         change={stats.trends?.totalSessions?.change}
// //         changeType={stats.trends?.totalSessions?.trend}
// //       />
// //       <StatCard
// //         title="Unique Visitors"
// //         value={stats.overview?.totalVisitors?.toLocaleString()}
// //         icon={<FaEye />}
// //         change={stats.trends?.totalVisitors?.change}
// //         changeType={stats.trends?.totalVisitors?.trend}
// //       />
// //       <StatCard
// //         title="Page Views"
// //         value={stats.overview?.totalPageViews?.toLocaleString()}
// //         icon={<FaMousePointer />}
// //         change={stats.trends?.totalPageViews?.change}
// //         changeType={stats.trends?.totalPageViews?.trend}
// //       />
// //       <StatCard
// //         title="Avg. Session Duration"
// //         value={`${Math.floor(stats.overview?.avgSessionDuration / 60)}m ${stats.overview?.avgSessionDuration % 60}s`}
// //         icon={<FaClock />}
// //         change={stats.trends?.avgSessionDuration?.change}
// //         changeType={stats.trends?.avgSessionDuration?.trend}
// //       />
// //       <StatCard
// //         title="Bounce Rate"
// //         value={`${stats.overview?.bounceRate?.toFixed(1)}%`}
// //         icon={<FaChartLine />}
// //         change={stats.trends?.bounceRate?.change}
// //         changeType={stats.trends?.bounceRate?.trend === 'down' ? 'positive' : 'negative'}
// //         subtitle="Single page sessions"
// //       />
// //       <StatCard
// //         title="Pages/Session"
// //         value={stats.overview?.pagesPerSession?.toFixed(1)}
// //         icon={<FaScroll />}
// //         change={stats.trends?.pagesPerSession?.change}
// //         changeType={stats.trends?.pagesPerSession?.trend}
// //       />
// //     </div>

// //     {/* Export buttons for specific data sections */}
// //     <div className="section-export-controls">
// //       <button 
// //         className="section-export-btn"
// //         onClick={() => onExportData('traffic-sources', stats.trafficSources)}
// //       >
// //         <FaDownload /> Export Traffic Sources
// //       </button>
// //       <button 
// //         className="section-export-btn"
// //         onClick={() => onExportData('page-performance', stats.pagePerformance)}
// //       >
// //         <FaDownload /> Export Page Performance
// //       </button>
// //       <button 
// //         className="section-export-btn"
// //         onClick={() => onExportData('geographic-data', stats.geographicData)}
// //       >
// //         <FaDownload /> Export Geographic Data
// //       </button>
// //     </div>

// //     {/* Detailed Analytics Grid */}
// //     <div className="analytics-grid">
// //       {/* Traffic Sources */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Traffic Sources</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('traffic-sources', stats.trafficSources)}
// //             title="Export Traffic Sources"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="sources-list">
// //           {stats.trafficSources?.map((source, index) => (
// //             <div key={index} className="source-item">
// //               <div className="source-info">
// //                 <span className="source-name">{source.source || 'Direct'}</span>
// //                 <span className="source-medium">{source.medium || '(none)'}</span>
// //               </div>
// //               <div className="source-stats">
// //                 <span className="sessions">{source.sessions} sessions</span>
// //                 <span className="duration">{Math.round(source.avgDuration)}s avg</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Top Performing Pages */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Top Performing Pages</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('page-performance', stats.pagePerformance)}
// //             title="Export Page Performance"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="pages-list">
// //           {stats.pagePerformance?.map((page, index) => (
// //             <div key={index} className="page-item">
// //               <div className="page-info">
// //                 <span className="page-title">{page.title}</span>
// //                 <span className="page-path">{page.path}</span>
// //               </div>
// //               <div className="page-stats">
// //                 <span className="views">{page.views} views</span>
// //                 <span className="duration">{page.avgDuration}s</span>
// //                 <span className="scroll">{page.avgScrollDepth}% scroll</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Geographic Distribution */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Visitors by Country</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('geographic-data', stats.geographicData)}
// //             title="Export Geographic Data"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="countries-list">
// //           {stats.geographicData?.map((country, index) => (
// //             <div key={index} className="country-item">
// //               <div className="country-flag">🌍</div>
// //               <span className="country-name">{country.country}</span>
// //               <span className="country-visitors">{country.visitors} visitors</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Device & Browser Stats */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Device Distribution</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('device-stats', stats.deviceStats)}
// //             title="Export Device Stats"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="device-stats">
// //           {stats.deviceStats?.map((device, index) => (
// //             <div key={index} className="device-item">
// //               {device.type === 'desktop' && <FaDesktop />}
// //               {device.type === 'mobile' && <FaMobile />}
// //               {device.type === 'tablet' && <FaTablet />}
// //               <span className="device-type">{device.type}</span>
// //               <span className="device-percentage">{device.percentage?.toFixed(1)}%</span>
// //               <span className="device-sessions">{device.sessions} sessions</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* User Engagement */}
// //       <div className="chart-card">
// //         <h3>User Engagement</h3>
// //         <div className="engagement-stats">
// //           <div className="engagement-item">
// //             <FaMousePointer />
// //             <span>Clicks: {stats.userBehavior?.[0]?.totalClicks?.toLocaleString()}</span>
// //           </div>
// //           <div className="engagement-item">
// //             <FaScroll />
// //             <span>Scrolls: {stats.userBehavior?.[0]?.totalScrolls?.toLocaleString()}</span>
// //           </div>
// //           <div className="engagement-item">
// //             <FaFileDownload />
// //             <span>Downloads: {stats.userBehavior?.[0]?.totalDownloads?.toLocaleString()}</span>
// //           </div>
// //           <div className="engagement-item">
// //             <FaVideo />
// //             <span>Videos: {stats.userBehavior?.[0]?.videosStarted?.toLocaleString()}</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Performance Metrics */}
// //       <div className="chart-card">
// //         <h3>Performance Metrics</h3>
// //         <div className="performance-stats">
// //           <div className="performance-item">
// //             <FaNetworkWired />
// //             <span>LCP: {stats.performance?.largestContentfulPaint?.toFixed(0)}ms</span>
// //           </div>
// //           <div className="performance-item">
// //             <FaChartLine />
// //             <span>CLS: {stats.performance?.cumulativeLayoutShift?.toFixed(3)}</span>
// //           </div>
// //           <div className="performance-item">
// //             <FaClock />
// //             <span>FID: {stats.performance?.firstInputDelay?.toFixed(0)}ms</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </>
// // );

// // const RealTimeDashboard = ({ stats, loading, onExportData }) => (
// //   <div className="realtime-dashboard">
// //     <div className="realtime-header">
// //       <h2>Real-time Analytics</h2>
// //       <div className="last-updated">
// //         Last updated: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'Loading...'}
// //       </div>
// //     </div>

// //     <div className="realtime-grid">
// //       <StatCard
// //         title="Active Visitors"
// //         value={stats.activeVisitors?.toLocaleString()}
// //         icon={<FaUserClock />}
// //         subtitle="Last 5 minutes"
// //       />

// //       {/* Recent Page Views */}
// //       <div className="chart-card full-width">
// //         <div className="chart-header">
// //           <h3>Recent Page Views</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('recent-pages', stats.recentPageViews)}
// //             title="Export Recent Pages"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="recent-pages">
// //           {stats.recentPageViews?.map((page, index) => (
// //             <div key={index} className="recent-page-item">
// //               <span className="page-title">{page.title}</span>
// //               <span className="page-views">{page.views} views</span>
// //               <span className="page-time">{new Date(page.lastView).toLocaleTimeString()}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Current Events */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Current Events</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('current-events', stats.currentEvents)}
// //             title="Export Current Events"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="current-events">
// //           {stats.currentEvents?.map((event, index) => (
// //             <div key={index} className="event-item">
// //               <span className="event-name">{event._id}</span>
// //               <span className="event-count">{event.count}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Geographic Distribution */}
// //       <div className="chart-card">
// //         <div className="chart-header">
// //           <h3>Active Visitors by Country</h3>
// //           <button 
// //             className="inline-export-btn"
// //             onClick={() => onExportData('active-countries', stats.geographicDistribution)}
// //             title="Export Active Countries"
// //           >
// //             <FaDownload />
// //           </button>
// //         </div>
// //         <div className="active-countries">
// //           {stats.geographicDistribution?.map((country, index) => (
// //             <div key={index} className="active-country-item">
// //               <span className="country-name">{country._id}</span>
// //               <span className="country-count">{country.count} visitors</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // );

// // const UserJourneyDashboard = ({ stats, onExportData }) => (
// //   <div className="user-journey-dashboard">
// //     <div className="journey-header">
// //       <h2>User Journey Analysis</h2>
// //       <button 
// //         className="export-btn"
// //         onClick={() => onExportData('user-journeys', stats)}
// //         title="Export User Journeys"
// //       >
// //         <FaDownload /> Export Journeys
// //       </button>
// //     </div>
// //     <div className="journey-stats">
// //       {stats.map((session, index) => (
// //         <div key={index} className="session-journey">
// //           <div className="session-header">
// //             <span className="session-id">Session: {session.sessionId?.slice(0, 8)}...</span>
// //             <span className="session-duration">{Math.round(session.totalDuration / 60)}m {session.totalDuration % 60}s</span>
// //           </div>
// //           <div className="pages-flow">
// //             {session.pages?.map((page, pageIndex) => (
// //               <div key={pageIndex} className="page-step">
// //                 <div className="page-info">
// //                   <span className="page-title">{page.title}</span>
// //                   <span className="page-duration">{page.duration}s</span>
// //                 </div>
// //                 {pageIndex < session.pages.length - 1 && <div className="flow-arrow">→</div>}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // // Main AnalyticsDashboard component
// // const AnalyticsDashboard = () => {
// //   const { trackEvent } = useAnalytics();
// //   const [timeRange, setTimeRange] = useState('7d');
// //   const [dashboardType, setDashboardType] = useState('overview');
// //   const [stats, setStats] = useState({});
// //   const [realTimeStats, setRealTimeStats] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [realTimeLoading, setRealTimeLoading] = useState(false);
// //   const [exporting, setExporting] = useState(false);

// //   useEffect(() => {
// //     loadAnalyticsData();
// //     if (dashboardType === 'realtime') {
// //       loadRealTimeData();
// //       const interval = setInterval(loadRealTimeData, 30000); // Update every 30 seconds
// //       return () => clearInterval(interval);
// //     }
// //   }, [timeRange, dashboardType]);

// //   const loadAnalyticsData = async () => {
// //     try {
// //       setLoading(true);
// //       const endpoint = dashboardType === 'overview' 
// //         ? '/analytics/dashboard/advanced' 
// //         : '/analytics/user-journey';
      
// //       const response = await axios.get(
// //         `${import.meta.env.VITE_API_BASE_URL}${endpoint}?range=${timeRange}`,
// //         { withCredentials: true }
// //       );
// //       setStats(response.data.data);
// //     } catch (error) {
// //       console.error('Error loading analytics:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const loadRealTimeData = async () => {
// //     try {
// //       setRealTimeLoading(true);
// //       const response = await axios.get(
// //         `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard/realtime`,
// //         { withCredentials: true }
// //       );
// //       setRealTimeStats(response.data.data);
// //     } catch (error) {
// //       console.error('Error loading real-time data:', error);
// //     } finally {
// //       setRealTimeLoading(false);
// //     }
// //   };

// //   // Export data as CSV
// //   const exportData = async (type, format = 'csv') => {
// //     try {
// //       setExporting(true);
      
// //       let url = '';
// //       let filename = '';
      
// //       switch (type) {
// //         case 'sessions':
// //           url = `${import.meta.env.VITE_API_BASE_URL}/analytics/export/sessions?format=${format}&range=${timeRange}`;
// //           filename = `sessions-export-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
// //           break;
// //         case 'events':
// //           url = `${import.meta.env.VITE_API_BASE_URL}/analytics/export/events?format=${format}&range=${timeRange}`;
// //           filename = `events-export-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
// //           break;
// //         case 'overview':
// //           // Client-side export for overview data
// //           exportOverviewToCSV(stats, filename);
// //           setExporting(false);
// //           return;
// //         default:
// //           console.error('Unknown export type:', type);
// //           return;
// //       }

// //       const response = await axios.get(url, {
// //         withCredentials: true,
// //         responseType: 'blob'
// //       });

// //       // Create download link
// //       const blob = new Blob([response.data], { type: 'text/csv' });
// //       const downloadUrl = window.URL.createObjectURL(blob);
// //       const link = document.createElement('a');
// //       link.href = downloadUrl;
// //       link.download = filename;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       window.URL.revokeObjectURL(downloadUrl);

// //       trackEvent('export_download', {
// //         exportType: type,
// //         format: format,
// //         timeRange: timeRange
// //       });

// //     } catch (error) {
// //       console.error('Error exporting data:', error);
// //       alert('Failed to export data. Please try again.');
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   // Client-side CSV export for specific data sections
// //   const exportDataSection = (sectionName, data) => {
// //     if (!data || data.length === 0) {
// //       alert('No data available to export');
// //       return;
// //     }

// //     try {
// //       const csvContent = convertToCSV(data, sectionName);
// //       const blob = new Blob([csvContent], { type: 'text/csv' });
// //       const downloadUrl = window.URL.createObjectURL(blob);
// //       const link = document.createElement('a');
// //       link.href = downloadUrl;
// //       link.download = `${sectionName}-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       window.URL.revokeObjectURL(downloadUrl);

// //       trackEvent('section_export', {
// //         section: sectionName,
// //         dataCount: data.length
// //       });
// //     } catch (error) {
// //       console.error('Error exporting section data:', error);
// //       alert('Failed to export data section');
// //     }
// //   };

// //   // Convert data to CSV format
// //   const convertToCSV = (data, sectionName) => {
// //     if (!data || data.length === 0) return '';
    
// //     const headers = Object.keys(data[0]);
// //     const csvRows = [];
    
// //     // Add headers
// //     csvRows.push(headers.map(header => `"${header}"`).join(','));
    
// //     // Add data rows
// //     data.forEach(row => {
// //       const values = headers.map(header => {
// //         const value = row[header];
// //         // Handle nested objects and arrays
// //         if (typeof value === 'object' && value !== null) {
// //           return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
// //         }
// //         return `"${String(value || '').replace(/"/g, '""')}"`;
// //       });
// //       csvRows.push(values.join(','));
// //     });
    
// //     return csvRows.join('\n');
// //   };

// //   // Export overview data to CSV
// //   const exportOverviewToCSV = (overviewData, filename) => {
// //     const csvRows = [];
    
// //     // Add overview metrics
// //     csvRows.push(['Metric', 'Value']);
// //     if (overviewData.overview) {
// //       Object.entries(overviewData.overview).forEach(([key, value]) => {
// //         csvRows.push([key, value]);
// //       });
// //     }
    
// //     const csvContent = csvRows.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
// //     const blob = new Blob([csvContent], { type: 'text/csv' });
// //     const downloadUrl = window.URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = downloadUrl;
// //     link.download = `overview-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     window.URL.revokeObjectURL(downloadUrl);
// //   };

// //   if (loading) {
// //     return (
// //       <Wrapper>
// //         <div className="loading">Loading analytics data...</div>
// //       </Wrapper>
// //     );
// //   }

// //   return (
// //     <Wrapper>
// //       <div className="dashboard-header">
// //         <div className="header-left">
// //           <h1>Advanced Analytics Dashboard</h1>
// //           <p>Comprehensive insights into user behavior and website performance</p>
// //         </div>
// //         <div className="header-controls">
// //           <DashboardTabs dashboardType={dashboardType} setDashboardType={setDashboardType} />
// //           <div className="controls-right">
// //             <div className="time-range-selector">
// //               <select 
// //                 value={timeRange} 
// //                 onChange={(e) => setTimeRange(e.target.value)}
// //               >
// //                 <option value="1d">Last 24 Hours</option>
// //                 <option value="7d">Last 7 Days</option>
// //                 <option value="30d">Last 30 Days</option>
// //                 <option value="90d">Last 90 Days</option>
// //               </select>
// //             </div>
// //             <ExportControls 
// //               dashboardType={dashboardType}
// //               timeRange={timeRange}
// //               onExport={exportData}
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {exporting && (
// //         <div className="export-overlay">
// //           <div className="export-loading">
// //             <FaDownload />
// //             <span>Preparing your export...</span>
// //           </div>
// //         </div>
// //       )}

// //       {dashboardType === 'overview' && (
// //         <OverviewDashboard 
// //           stats={stats} 
// //           onExportData={exportDataSection}
// //         />
// //       )}
// //       {dashboardType === 'realtime' && (
// //         <RealTimeDashboard 
// //           stats={realTimeStats} 
// //           loading={realTimeLoading}
// //           onExportData={exportDataSection}
// //         />
// //       )}
// //       {dashboardType === 'userjourney' && (
// //         <UserJourneyDashboard 
// //           stats={stats} 
// //           onExportData={exportDataSection}
// //         />
// //       )}
// //     </Wrapper>
// //   );
// // };

// // // Styled Components
// // const Wrapper = styled.div`
// //   padding: 2rem;
// //   background: #f8fafc;
// //   min-height: 100vh;
// //   position: relative;

// //   .dashboard-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: flex-start;
// //     margin-bottom: 2rem;
// //     flex-wrap: wrap;
// //     gap: 1rem;

// //     .header-left {
// //       h1 {
// //         color: #1a202c;
// //         font-size: 2rem;
// //         font-weight: 700;
// //         margin-bottom: 0.5rem;
// //       }

// //       p {
// //         color: #718096;
// //         font-size: 1rem;
// //       }
// //     }

// //     .header-controls {
// //       display: flex;
// //       gap: 1rem;
// //       align-items: center;
// //       flex-wrap: wrap;

// //       .controls-right {
// //         display: flex;
// //         gap: 1rem;
// //         align-items: center;
// //         flex-wrap: wrap;
// //       }
// //     }

// //     .time-range-selector select {
// //       padding: 0.5rem 1rem;
// //       border: 2px solid #e2e8f0;
// //       border-radius: 6px;
// //       background: white;
// //       cursor: pointer;
// //     }
// //   }

// //   .section-export-controls {
// //     display: flex;
// //     gap: 1rem;
// //     margin-bottom: 2rem;
// //     flex-wrap: wrap;
// //   }

// //   .metrics-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
// //     gap: 1.5rem;
// //     margin-bottom: 2rem;
// //   }

// //   .analytics-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
// //     gap: 1.5rem;
// //   }

// //   .chart-card {
// //     background: white;
// //     padding: 1.5rem;
// //     border-radius: 12px;
// //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //     position: relative;

// //     &.full-width {
// //       grid-column: 1 / -1;
// //     }

// //     .chart-header {
// //       display: flex;
// //       justify-content: space-between;
// //       align-items: center;
// //       margin-bottom: 1rem;

// //       h3 {
// //         color: #2d3748;
// //         font-size: 1.2rem;
// //         font-weight: 600;
// //         margin: 0;
// //       }
// //     }

// //     // ... rest of your existing chart card styles
// //   }

// //   .export-overlay {
// //     position: fixed;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     bottom: 0;
// //     background: rgba(0, 0, 0, 0.7);
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     z-index: 1000;

// //     .export-loading {
// //       background: white;
// //       padding: 2rem;
// //       border-radius: 12px;
// //       display: flex;
// //       align-items: center;
// //       gap: 1rem;
// //       font-size: 1.1rem;
// //       color: #2d3748;

// //       svg {
// //         animation: spin 1s linear infinite;
// //       }
// //     }
// //   }

// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }

// //   // ... rest of your existing styles
// // `;

// // const StatCardWrapper = styled.div`
// //   background: white;
// //   padding: 1.5rem;
// //   border-radius: 12px;
// //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// //   display: flex;
// //   align-items: center;
// //   gap: 1rem;
// //   transition: transform 0.2s ease;

// //   &:hover {
// //     transform: translateY(-2px);
// //   }

// //   .stat-icon {
// //     background: #e8f4ff;
// //     padding: 1rem;
// //     border-radius: 10px;
// //     color: #2d8cd4;
// //     font-size: 1.5rem;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //   }

// //   .stat-content {
// //     flex: 1;

// //     h3 {
// //       color: #718096;
// //       font-size: 0.9rem;
// //       margin-bottom: 0.5rem;
// //       text-transform: uppercase;
// //       letter-spacing: 0.5px;
// //     }

// //     .stat-value {
// //       color: #1a202c;
// //       font-size: 1.5rem;
// //       font-weight: 700;
// //       margin-bottom: 0.25rem;
// //     }

// //     .stat-subtitle {
// //       color: #a0aec0;
// //       font-size: 0.8rem;
// //       margin-bottom: 0.25rem;
// //     }

// //     .stat-change {
// //       font-size: 0.8rem;
// //       font-weight: 500;

// //       &.positive {
// //         color: #38a169;
// //       }

// //       &.negative {
// //         color: #e53e3e;
// //       }
// //     }
// //   }
// // `;

// // const TabsWrapper = styled.div`
// //   display: flex;
// //   background: #edf2f7;
// //   padding: 0.25rem;
// //   border-radius: 8px;

// //   button {
// //     display: flex;
// //     align-items: center;
// //     gap: 0.5rem;
// //     padding: 0.5rem 1rem;
// //     border: none;
// //     background: transparent;
// //     border-radius: 6px;
// //     cursor: pointer;
// //     transition: all 0.2s ease;
// //     font-weight: 500;
// //     color: #4a5568;

// //     &:hover {
// //       background: #e2e8f0;
// //     }

// //     &.active {
// //       background: white;
// //       color: #2d3748;
// //       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// //     }
// //   }
// // `;

// // const ExportControlsWrapper = styled.div`
// //   display: flex;
// //   gap: 0.5rem;
// //   flex-wrap: wrap;

// //   .export-btn, .section-export-btn, .inline-export-btn {
// //     display: flex;
// //     align-items: center;
// //     gap: 0.5rem;
// //     padding: 0.5rem 1rem;
// //     border: 1px solid #d1d5db;
// //     border-radius: 6px;
// //     background: white;
// //     color: #374151;
// //     cursor: pointer;
// //     transition: all 0.2s ease;
// //     font-size: 0.875rem;
// //     font-weight: 500;

// //     &:hover {
// //       background: #f3f4f6;
// //       border-color: #9ca3af;
// //     }

// //     &:active {
// //       background: #e5e7eb;
// //     }
// //   }

// //   .inline-export-btn {
// //     padding: 0.25rem 0.5rem;
// //     font-size: 0.75rem;
// //   }

// //   .section-export-btn {
// //     background: #1f2937;
// //     color: white;
// //     border-color: #1f2937;

// //     &:hover {
// //       background: #374151;
// //       border-color: #374151;
// //     }
// //   }
// // `;

// // export default AnalyticsDashboard;
















































// // // // components/AnalyticsDashboard.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { useAnalytics } from '../context/AnalyticsContext';
// // // import styled from 'styled-components';
// // // import axios from 'axios';
// // // import {
// // //   FaUsers,
// // //   FaEye,
// // //   FaClock,
// // //   FaGlobeAmericas,
// // //   FaDesktop,
// // //   FaMobile,
// // //   FaTablet,
// // //   FaChartLine,
// // //   FaMousePointer,
// // //   FaScroll,
// // //   FaFileDownload,
// // //   FaVideo,
// // //   FaExchangeAlt,
// // //   FaUserClock,
// // //   FaChartBar,
// // //   FaMapMarkerAlt,
// // //   FaNetworkWired
// // // } from 'react-icons/fa';

// // // // Move StatCard component outside of AnalyticsDashboard
// // // const StatCard = ({ title, value, icon, change, changeType, subtitle }) => (
// // //   <StatCardWrapper>
// // //     <div className="stat-icon">{icon}</div>
// // //     <div className="stat-content">
// // //       <h3>{title}</h3>
// // //       <div className="stat-value">{value}</div>
// // //       {subtitle && <div className="stat-subtitle">{subtitle}</div>}
// // //       {change && (
// // //         <div className={`stat-change ${changeType}`}>
// // //           {change > 0 ? '+' : ''}{change}% from previous period
// // //         </div>
// // //       )}
// // //     </div>
// // //   </StatCardWrapper>
// // // );

// // // // Move DashboardTabs component outside
// // // const DashboardTabs = ({ dashboardType, setDashboardType }) => (
// // //   <TabsWrapper>
// // //     <button 
// // //       className={dashboardType === 'overview' ? 'active' : ''}
// // //       onClick={() => setDashboardType('overview')}
// // //     >
// // //       <FaChartBar /> Overview
// // //     </button>
// // //     <button 
// // //       className={dashboardType === 'realtime' ? 'active' : ''}
// // //       onClick={() => setDashboardType('realtime')}
// // //     >
// // //       <FaUserClock /> Real-time
// // //     </button>
// // //     <button 
// // //       className={dashboardType === 'userjourney' ? 'active' : ''}
// // //       onClick={() => setDashboardType('userjourney')}
// // //     >
// // //       <FaExchangeAlt /> User Journey
// // //     </button>
// // //   </TabsWrapper>
// // // );

// // // // Move sub-dashboard components outside
// // // const OverviewDashboard = ({ stats }) => (
// // //   <>
// // //     {/* Key Metrics Grid */}
// // //     <div className="metrics-grid">
// // //       <StatCard
// // //         title="Total Sessions"
// // //         value={stats.overview?.totalSessions?.toLocaleString()}
// // //         icon={<FaUsers />}
// // //         change={stats.trends?.totalSessions?.change}
// // //         changeType={stats.trends?.totalSessions?.trend}
// // //       />
// // //       <StatCard
// // //         title="Unique Visitors"
// // //         value={stats.overview?.totalVisitors?.toLocaleString()}
// // //         icon={<FaEye />}
// // //         change={stats.trends?.totalVisitors?.change}
// // //         changeType={stats.trends?.totalVisitors?.trend}
// // //       />
// // //       <StatCard
// // //         title="Page Views"
// // //         value={stats.overview?.totalPageViews?.toLocaleString()}
// // //         icon={<FaMousePointer />}
// // //         change={stats.trends?.totalPageViews?.change}
// // //         changeType={stats.trends?.totalPageViews?.trend}
// // //       />
// // //       <StatCard
// // //         title="Avg. Session Duration"
// // //         value={`${Math.floor(stats.overview?.avgSessionDuration / 60)}m ${stats.overview?.avgSessionDuration % 60}s`}
// // //         icon={<FaClock />}
// // //         change={stats.trends?.avgSessionDuration?.change}
// // //         changeType={stats.trends?.avgSessionDuration?.trend}
// // //       />
// // //       <StatCard
// // //         title="Bounce Rate"
// // //         value={`${stats.overview?.bounceRate?.toFixed(1)}%`}
// // //         icon={<FaChartLine />}
// // //         change={stats.trends?.bounceRate?.change}
// // //         changeType={stats.trends?.bounceRate?.trend === 'down' ? 'positive' : 'negative'}
// // //         subtitle="Single page sessions"
// // //       />
// // //       <StatCard
// // //         title="Pages/Session"
// // //         value={stats.overview?.pagesPerSession?.toFixed(1)}
// // //         icon={<FaScroll />}
// // //         change={stats.trends?.pagesPerSession?.change}
// // //         changeType={stats.trends?.pagesPerSession?.trend}
// // //       />
// // //     </div>

// // //     {/* Detailed Analytics Grid */}
// // //     <div className="analytics-grid">
// // //       {/* Traffic Sources */}
// // //       <div className="chart-card">
// // //         <h3>Traffic Sources</h3>
// // //         <div className="sources-list">
// // //           {stats.trafficSources?.map((source, index) => (
// // //             <div key={index} className="source-item">
// // //               <div className="source-info">
// // //                 <span className="source-name">{source.source || 'Direct'}</span>
// // //                 <span className="source-medium">{source.medium || '(none)'}</span>
// // //               </div>
// // //               <div className="source-stats">
// // //                 <span className="sessions">{source.sessions} sessions</span>
// // //                 <span className="duration">{Math.round(source.avgDuration)}s avg</span>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Top Performing Pages */}
// // //       <div className="chart-card">
// // //         <h3>Top Performing Pages</h3>
// // //         <div className="pages-list">
// // //           {stats.pagePerformance?.map((page, index) => (
// // //             <div key={index} className="page-item">
// // //               <div className="page-info">
// // //                 <span className="page-title">{page.title}</span>
// // //                 <span className="page-path">{page.path}</span>
// // //               </div>
// // //               <div className="page-stats">
// // //                 <span className="views">{page.views} views</span>
// // //                 <span className="duration">{page.avgDuration}s</span>
// // //                 <span className="scroll">{page.avgScrollDepth}% scroll</span>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Geographic Distribution */}
// // //       <div className="chart-card">
// // //         <h3>Visitors by Country</h3>
// // //         <div className="countries-list">
// // //           {stats.geographicData?.map((country, index) => (
// // //             <div key={index} className="country-item">
// // //               <div className="country-flag">🌍</div>
// // //               <span className="country-name">{country.country}</span>
// // //               <span className="country-visitors">{country.visitors} visitors</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Device & Browser Stats */}
// // //       <div className="chart-card">
// // //         <h3>Device Distribution</h3>
// // //         <div className="device-stats">
// // //           {stats.deviceStats?.map((device, index) => (
// // //             <div key={index} className="device-item">
// // //               {device.type === 'desktop' && <FaDesktop />}
// // //               {device.type === 'mobile' && <FaMobile />}
// // //               {device.type === 'tablet' && <FaTablet />}
// // //               <span className="device-type">{device.type}</span>
// // //               <span className="device-percentage">{device.percentage?.toFixed(1)}%</span>
// // //               <span className="device-sessions">{device.sessions} sessions</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* User Engagement */}
// // //       <div className="chart-card">
// // //         <h3>User Engagement</h3>
// // //         <div className="engagement-stats">
// // //           <div className="engagement-item">
// // //             <FaMousePointer />
// // //             <span>Clicks: {stats.userBehavior?.[0]?.totalClicks?.toLocaleString()}</span>
// // //           </div>
// // //           <div className="engagement-item">
// // //             <FaScroll />
// // //             <span>Scrolls: {stats.userBehavior?.[0]?.totalScrolls?.toLocaleString()}</span>
// // //           </div>
// // //           <div className="engagement-item">
// // //             <FaFileDownload />
// // //             <span>Downloads: {stats.userBehavior?.[0]?.totalDownloads?.toLocaleString()}</span>
// // //           </div>
// // //           <div className="engagement-item">
// // //             <FaVideo />
// // //             <span>Videos: {stats.userBehavior?.[0]?.videosStarted?.toLocaleString()}</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Performance Metrics */}
// // //       <div className="chart-card">
// // //         <h3>Performance Metrics</h3>
// // //         <div className="performance-stats">
// // //           <div className="performance-item">
// // //             <FaNetworkWired />
// // //             <span>LCP: {stats.performance?.largestContentfulPaint?.toFixed(0)}ms</span>
// // //           </div>
// // //           <div className="performance-item">
// // //             <FaChartLine />
// // //             <span>CLS: {stats.performance?.cumulativeLayoutShift?.toFixed(3)}</span>
// // //           </div>
// // //           <div className="performance-item">
// // //             <FaClock />
// // //             <span>FID: {stats.performance?.firstInputDelay?.toFixed(0)}ms</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </>
// // // );

// // // const RealTimeDashboard = ({ stats, loading }) => (
// // //   <div className="realtime-dashboard">
// // //     <div className="realtime-header">
// // //       <h2>Real-time Analytics</h2>
// // //       <div className="last-updated">
// // //         Last updated: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'Loading...'}
// // //       </div>
// // //     </div>

// // //     <div className="realtime-grid">
// // //       <StatCard
// // //         title="Active Visitors"
// // //         value={stats.activeVisitors?.toLocaleString()}
// // //         icon={<FaUserClock />}
// // //         subtitle="Last 5 minutes"
// // //       />

// // //       {/* Recent Page Views */}
// // //       <div className="chart-card full-width">
// // //         <h3>Recent Page Views</h3>
// // //         <div className="recent-pages">
// // //           {stats.recentPageViews?.map((page, index) => (
// // //             <div key={index} className="recent-page-item">
// // //               <span className="page-title">{page.title}</span>
// // //               <span className="page-views">{page.views} views</span>
// // //               <span className="page-time">{new Date(page.lastView).toLocaleTimeString()}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Current Events */}
// // //       <div className="chart-card">
// // //         <h3>Current Events</h3>
// // //         <div className="current-events">
// // //           {stats.currentEvents?.map((event, index) => (
// // //             <div key={index} className="event-item">
// // //               <span className="event-name">{event._id}</span>
// // //               <span className="event-count">{event.count}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Geographic Distribution */}
// // //       <div className="chart-card">
// // //         <h3>Active Visitors by Country</h3>
// // //         <div className="active-countries">
// // //           {stats.geographicDistribution?.map((country, index) => (
// // //             <div key={index} className="active-country-item">
// // //               <span className="country-name">{country._id}</span>
// // //               <span className="country-count">{country.count} visitors</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   </div>
// // // );

// // // const UserJourneyDashboard = ({ stats }) => (
// // //   <div className="user-journey-dashboard">
// // //     <h2>User Journey Analysis</h2>
// // //     <div className="journey-stats">
// // //       {stats.map((session, index) => (
// // //         <div key={index} className="session-journey">
// // //           <div className="session-header">
// // //             <span className="session-id">Session: {session.sessionId?.slice(0, 8)}...</span>
// // //             <span className="session-duration">{Math.round(session.totalDuration / 60)}m {session.totalDuration % 60}s</span>
// // //           </div>
// // //           <div className="pages-flow">
// // //             {session.pages?.map((page, pageIndex) => (
// // //               <div key={pageIndex} className="page-step">
// // //                 <div className="page-info">
// // //                   <span className="page-title">{page.title}</span>
// // //                   <span className="page-duration">{page.duration}s</span>
// // //                 </div>
// // //                 {pageIndex < session.pages.length - 1 && <div className="flow-arrow">→</div>}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   </div>
// // // );

// // // // Main AnalyticsDashboard component
// // // const AnalyticsDashboard = () => {
// // //   const { trackEvent } = useAnalytics();
// // //   const [timeRange, setTimeRange] = useState('7d');
// // //   const [dashboardType, setDashboardType] = useState('overview');
// // //   const [stats, setStats] = useState({});
// // //   const [realTimeStats, setRealTimeStats] = useState({});
// // //   const [loading, setLoading] = useState(true);
// // //   const [realTimeLoading, setRealTimeLoading] = useState(false);

// // //   useEffect(() => {
// // //     loadAnalyticsData();
// // //     if (dashboardType === 'realtime') {
// // //       loadRealTimeData();
// // //       const interval = setInterval(loadRealTimeData, 30000); // Update every 30 seconds
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [timeRange, dashboardType]);

// // //   const loadAnalyticsData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const endpoint = dashboardType === 'overview' 
// // //         ? '/analytics/dashboard/advanced' 
// // //         : '/analytics/user-journey';
      
// // //       const response = await axios.get(
// // //         `${import.meta.env.VITE_API_BASE_URL}${endpoint}?range=${timeRange}`,
// // //         { withCredentials: true }
// // //       );
// // //       setStats(response.data.data);
// // //     } catch (error) {
// // //       console.error('Error loading analytics:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const loadRealTimeData = async () => {
// // //     try {
// // //       setRealTimeLoading(true);
// // //       const response = await axios.get(
// // //         `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard/realtime`,
// // //         { withCredentials: true }
// // //       );
// // //       setRealTimeStats(response.data.data);
// // //     } catch (error) {
// // //       console.error('Error loading real-time data:', error);
// // //     } finally {
// // //       setRealTimeLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Wrapper>
// // //         <div className="loading">Loading analytics data...</div>
// // //       </Wrapper>
// // //     );
// // //   }

// // //   return (
// // //     <Wrapper>
// // //       <div className="dashboard-header">
// // //         <div className="header-left">
// // //           <h1>Advanced Analytics Dashboard</h1>
// // //           <p>Comprehensive insights into user behavior and website performance</p>
// // //         </div>
// // //         <div className="header-controls">
// // //           <DashboardTabs dashboardType={dashboardType} setDashboardType={setDashboardType} />
// // //           <div className="time-range-selector">
// // //             <select 
// // //               value={timeRange} 
// // //               onChange={(e) => setTimeRange(e.target.value)}
// // //             >
// // //               <option value="1d">Last 24 Hours</option>
// // //               <option value="7d">Last 7 Days</option>
// // //               <option value="30d">Last 30 Days</option>
// // //               <option value="90d">Last 90 Days</option>
// // //             </select>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {dashboardType === 'overview' && <OverviewDashboard stats={stats} />}
// // //       {dashboardType === 'realtime' && <RealTimeDashboard stats={realTimeStats} loading={realTimeLoading} />}
// // //       {dashboardType === 'userjourney' && <UserJourneyDashboard stats={stats} />}
// // //     </Wrapper>
// // //   );
// // // };

// // // // Styled Components (keep these at the bottom)
// // // const Wrapper = styled.div`
// // //   padding: 2rem;
// // //   background: #f8fafc;
// // //   min-height: 100vh;

// // //   .dashboard-header {
// // //     display: flex;
// // //     justify-content: space-between;
// // //     align-items: flex-start;
// // //     margin-bottom: 2rem;
// // //     flex-wrap: wrap;
// // //     gap: 1rem;

// // //     .header-left {
// // //       h1 {
// // //         color: #1a202c;
// // //         font-size: 2rem;
// // //         font-weight: 700;
// // //         margin-bottom: 0.5rem;
// // //       }

// // //       p {
// // //         color: #718096;
// // //         font-size: 1rem;
// // //       }
// // //     }

// // //     .header-controls {
// // //       display: flex;
// // //       gap: 1rem;
// // //       align-items: center;
// // //       flex-wrap: wrap;
// // //     }

// // //     .time-range-selector select {
// // //       padding: 0.5rem 1rem;
// // //       border: 2px solid #e2e8f0;
// // //       border-radius: 6px;
// // //       background: white;
// // //       cursor: pointer;
// // //     }
// // //   }

// // //   .metrics-grid {
// // //     display: grid;
// // //     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
// // //     gap: 1.5rem;
// // //     margin-bottom: 2rem;
// // //   }

// // //   .analytics-grid {
// // //     display: grid;
// // //     grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
// // //     gap: 1.5rem;
// // //   }

// // //   .chart-card {
// // //     background: white;
// // //     padding: 1.5rem;
// // //     border-radius: 12px;
// // //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

// // //     &.full-width {
// // //       grid-column: 1 / -1;
// // //     }

// // //     h3 {
// // //       margin-bottom: 1rem;
// // //       color: #2d3748;
// // //       font-size: 1.2rem;
// // //       font-weight: 600;
// // //     }

// // //     .sources-list, .pages-list, .countries-list, .device-stats,
// // //     .engagement-stats, .performance-stats, .recent-pages,
// // //     .current-events, .active-countries {
// // //       .source-item, .page-item, .country-item, .device-item,
// // //       .engagement-item, .performance-item, .recent-page-item,
// // //       .event-item, .active-country-item {
// // //         display: flex;
// // //         justify-content: space-between;
// // //         align-items: center;
// // //         padding: 0.75rem 0;
// // //         border-bottom: 1px solid #e2e8f0;

// // //         &:last-child {
// // //           border-bottom: none;
// // //         }
// // //       }
// // //     }

// // //     .source-info, .page-info {
// // //       display: flex;
// // //       flex-direction: column;
// // //       gap: 0.25rem;

// // //       .source-name, .page-title {
// // //         font-weight: 600;
// // //         color: #2d3748;
// // //       }

// // //       .source-medium, .page-path {
// // //         font-size: 0.8rem;
// // //         color: #718096;
// // //       }
// // //     }

// // //     .country-flag {
// // //       margin-right: 0.5rem;
// // //     }

// // //     .device-type {
// // //       text-transform: capitalize;
// // //       margin: 0 0.5rem;
// // //     }
// // //   }

// // //   .realtime-dashboard {
// // //     .realtime-header {
// // //       display: flex;
// // //       justify-content: space-between;
// // //       align-items: center;
// // //       margin-bottom: 2rem;
// // //     }

// // //     .realtime-grid {
// // //       display: grid;
// // //       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// // //       gap: 1.5rem;
// // //     }
// // //   }

// // //   .user-journey-dashboard {
// // //     .session-journey {
// // //       background: white;
// // //       padding: 1.5rem;
// // //       border-radius: 12px;
// // //       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // //       margin-bottom: 1rem;

// // //       .session-header {
// // //         display: flex;
// // //         justify-content: space-between;
// // //         margin-bottom: 1rem;
// // //         padding-bottom: 0.5rem;
// // //         border-bottom: 1px solid #e2e8f0;
// // //       }

// // //       .pages-flow {
// // //         display: flex;
// // //         align-items: center;
// // //         flex-wrap: wrap;
// // //         gap: 0.5rem;

// // //         .page-step {
// // //           display: flex;
// // //           align-items: center;
// // //           gap: 0.5rem;

// // //           .page-info {
// // //             background: #edf2f7;
// // //             padding: 0.5rem 1rem;
// // //             border-radius: 6px;
// // //             display: flex;
// // //             flex-direction: column;
// // //             gap: 0.25rem;

// // //             .page-title {
// // //               font-weight: 500;
// // //             }

// // //             .page-duration {
// // //               font-size: 0.8rem;
// // //               color: #718096;
// // //             }
// // //           }

// // //           .flow-arrow {
// // //             color: #a0aec0;
// // //             font-weight: bold;
// // //           }
// // //         }
// // //       }
// // //     }
// // //   }

// // //   .loading {
// // //     text-align: center;
// // //     padding: 3rem;
// // //     color: #718096;
// // //     font-size: 1.2rem;
// // //   }
// // // `;

// // // const StatCardWrapper = styled.div`
// // //   background: white;
// // //   padding: 1.5rem;
// // //   border-radius: 12px;
// // //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 1rem;
// // //   transition: transform 0.2s ease;

// // //   &:hover {
// // //     transform: translateY(-2px);
// // //   }

// // //   .stat-icon {
// // //     background: #e8f4ff;
// // //     padding: 1rem;
// // //     border-radius: 10px;
// // //     color: #2d8cd4;
// // //     font-size: 1.5rem;
// // //     display: flex;
// // //     align-items: center;
// // //     justify-content: center;
// // //   }

// // //   .stat-content {
// // //     flex: 1;

// // //     h3 {
// // //       color: #718096;
// // //       font-size: 0.9rem;
// // //       margin-bottom: 0.5rem;
// // //       text-transform: uppercase;
// // //       letter-spacing: 0.5px;
// // //     }

// // //     .stat-value {
// // //       color: #1a202c;
// // //       font-size: 1.5rem;
// // //       font-weight: 700;
// // //       margin-bottom: 0.25rem;
// // //     }

// // //     .stat-subtitle {
// // //       color: #a0aec0;
// // //       font-size: 0.8rem;
// // //       margin-bottom: 0.25rem;
// // //     }

// // //     .stat-change {
// // //       font-size: 0.8rem;
// // //       font-weight: 500;

// // //       &.positive {
// // //         color: #38a169;
// // //       }

// // //       &.negative {
// // //         color: #e53e3e;
// // //       }
// // //     }
// // //   }
// // // `;

// // // const TabsWrapper = styled.div`
// // //   display: flex;
// // //   background: #edf2f7;
// // //   padding: 0.25rem;
// // //   border-radius: 8px;

// // //   button {
// // //     display: flex;
// // //     align-items: center;
// // //     gap: 0.5rem;
// // //     padding: 0.5rem 1rem;
// // //     border: none;
// // //     background: transparent;
// // //     border-radius: 6px;
// // //     cursor: pointer;
// // //     transition: all 0.2s ease;
// // //     font-weight: 500;
// // //     color: #4a5568;

// // //     &:hover {
// // //       background: #e2e8f0;
// // //     }

// // //     &.active {
// // //       background: white;
// // //       color: #2d3748;
// // //       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// // //     }
// // //   }
// // // `;

// // // export default AnalyticsDashboard;








































































// // // // // components/AnalyticsDashboard.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAnalytics } from '../context/AnalyticsContext';
// // // // import styled from 'styled-components';
// // // // import axios from 'axios';
// // // // import {
// // // //   FaUsers,
// // // //   FaEye,
// // // //   FaClock,
// // // //   FaGlobeAmericas,
// // // //   FaDesktop,
// // // //   FaMobile,
// // // //   FaTablet,
// // // //   FaChartLine,
// // // //   FaMousePointer,
// // // //   FaScroll,
// // // //   FaFileDownload,
// // // //   FaVideo,
// // // //   FaExchangeAlt,
// // // //   FaUserClock,
// // // //   FaChartBar,
// // // //   FaMapMarkerAlt,
// // // //   FaNetworkWired
// // // // } from 'react-icons/fa';

// // // // const AnalyticsDashboard = () => {
// // // //   const { trackEvent } = useAnalytics();
// // // //   const [timeRange, setTimeRange] = useState('7d');
// // // //   const [dashboardType, setDashboardType] = useState('overview');
// // // //   const [stats, setStats] = useState({});
// // // //   const [realTimeStats, setRealTimeStats] = useState({});
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [realTimeLoading, setRealTimeLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     loadAnalyticsData();
// // // //     if (dashboardType === 'realtime') {
// // // //       loadRealTimeData();
// // // //       const interval = setInterval(loadRealTimeData, 30000); // Update every 30 seconds
// // // //       return () => clearInterval(interval);
// // // //     }
// // // //   }, [timeRange, dashboardType]);

// // // //   const loadAnalyticsData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const endpoint = dashboardType === 'overview' 
// // // //         ? '/analytics/dashboard/advanced' 
// // // //         : '/analytics/user-journey';
      
// // // //       const response = await axios.get(
// // // //         `${import.meta.env.VITE_API_BASE_URL}${endpoint}?range=${timeRange}`,
// // // //         { withCredentials: true }
// // // //       );
// // // //       setStats(response.data.data);
// // // //     } catch (error) {
// // // //       console.error('Error loading analytics:', error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const loadRealTimeData = async () => {
// // // //     try {
// // // //       setRealTimeLoading(true);
// // // //       const response = await axios.get(
// // // //         `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard/realtime`,
// // // //         { withCredentials: true }
// // // //       );
// // // //       setRealTimeStats(response.data.data);
// // // //     } catch (error) {
// // // //       console.error('Error loading real-time data:', error);
// // // //     } finally {
// // // //       setRealTimeLoading(false);
// // // //     }
// // // //   };

// // // //   const StatCard = ({ title, value, icon, change, changeType, subtitle }) => (
// // // //     <StatCardWrapper>
// // // //       <div className="stat-icon">{icon}</div>
// // // //       <div className="stat-content">
// // // //         <h3>{title}</h3>
// // // //         <div className="stat-value">{value}</div>
// // // //         {subtitle && <div className="stat-subtitle">{subtitle}</div>}
// // // //         {change && (
// // // //           <div className={`stat-change ${changeType}`}>
// // // //             {change > 0 ? '+' : ''}{change}% from previous period
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </StatCardWrapper>
// // // //   );

// // // //   const DashboardTabs = () => (
// // // //     <TabsWrapper>
// // // //       <button 
// // // //         className={dashboardType === 'overview' ? 'active' : ''}
// // // //         onClick={() => setDashboardType('overview')}
// // // //       >
// // // //         <FaChartBar /> Overview
// // // //       </button>
// // // //       <button 
// // // //         className={dashboardType === 'realtime' ? 'active' : ''}
// // // //         onClick={() => setDashboardType('realtime')}
// // // //       >
// // // //         <FaUserClock /> Real-time
// // // //       </button>
// // // //       <button 
// // // //         className={dashboardType === 'userjourney' ? 'active' : ''}
// // // //         onClick={() => setDashboardType('userjourney')}
// // // //       >
// // // //         <FaExchangeAlt /> User Journey
// // // //       </button>
// // // //     </TabsWrapper>
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <Wrapper>
// // // //         <div className="loading">Loading analytics data...</div>
// // // //       </Wrapper>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <Wrapper>
// // // //       <div className="dashboard-header">
// // // //         <div className="header-left">
// // // //           <h1>Advanced Analytics Dashboard</h1>
// // // //           <p>Comprehensive insights into user behavior and website performance</p>
// // // //         </div>
// // // //         <div className="header-controls">
// // // //           <DashboardTabs />
// // // //           <div className="time-range-selector">
// // // //             <select 
// // // //               value={timeRange} 
// // // //               onChange={(e) => setTimeRange(e.target.value)}
// // // //             >
// // // //               <option value="1d">Last 24 Hours</option>
// // // //               <option value="7d">Last 7 Days</option>
// // // //               <option value="30d">Last 30 Days</option>
// // // //               <option value="90d">Last 90 Days</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {dashboardType === 'overview' && <OverviewDashboard stats={stats} />}
// // // //       {dashboardType === 'realtime' && <RealTimeDashboard stats={realTimeStats} loading={realTimeLoading} />}
// // // //       {dashboardType === 'userjourney' && <UserJourneyDashboard stats={stats} />}
// // // //     </Wrapper>
// // // //   );
// // // // };

// // // // const OverviewDashboard = ({ stats }) => (
// // // //   <>
// // // //     {/* Key Metrics Grid */}
// // // //     <div className="metrics-grid">
// // // //       <StatCard
// // // //         title="Total Sessions"
// // // //         value={stats.overview?.totalSessions?.toLocaleString()}
// // // //         icon={<FaUsers />}
// // // //         change={stats.trends?.totalSessions?.change}
// // // //         changeType={stats.trends?.totalSessions?.trend}
// // // //       />
// // // //       <StatCard
// // // //         title="Unique Visitors"
// // // //         value={stats.overview?.totalVisitors?.toLocaleString()}
// // // //         icon={<FaEye />}
// // // //         change={stats.trends?.totalVisitors?.change}
// // // //         changeType={stats.trends?.totalVisitors?.trend}
// // // //       />
// // // //       <StatCard
// // // //         title="Page Views"
// // // //         value={stats.overview?.totalPageViews?.toLocaleString()}
// // // //         icon={<FaMousePointer />}
// // // //         change={stats.trends?.totalPageViews?.change}
// // // //         changeType={stats.trends?.totalPageViews?.trend}
// // // //       />
// // // //       <StatCard
// // // //         title="Avg. Session Duration"
// // // //         value={`${Math.floor(stats.overview?.avgSessionDuration / 60)}m ${stats.overview?.avgSessionDuration % 60}s`}
// // // //         icon={<FaClock />}
// // // //         change={stats.trends?.avgSessionDuration?.change}
// // // //         changeType={stats.trends?.avgSessionDuration?.trend}
// // // //       />
// // // //       <StatCard
// // // //         title="Bounce Rate"
// // // //         value={`${stats.overview?.bounceRate?.toFixed(1)}%`}
// // // //         icon={<FaChartLine />}
// // // //         change={stats.trends?.bounceRate?.change}
// // // //         changeType={stats.trends?.bounceRate?.trend === 'down' ? 'positive' : 'negative'}
// // // //         subtitle="Single page sessions"
// // // //       />
// // // //       <StatCard
// // // //         title="Pages/Session"
// // // //         value={stats.overview?.pagesPerSession?.toFixed(1)}
// // // //         icon={<FaScroll />}
// // // //         change={stats.trends?.pagesPerSession?.change}
// // // //         changeType={stats.trends?.pagesPerSession?.trend}
// // // //       />
// // // //     </div>

// // // //     {/* Detailed Analytics Grid */}
// // // //     <div className="analytics-grid">
// // // //       {/* Traffic Sources */}
// // // //       <div className="chart-card">
// // // //         <h3>Traffic Sources</h3>
// // // //         <div className="sources-list">
// // // //           {stats.trafficSources?.map((source, index) => (
// // // //             <div key={index} className="source-item">
// // // //               <div className="source-info">
// // // //                 <span className="source-name">{source.source || 'Direct'}</span>
// // // //                 <span className="source-medium">{source.medium || '(none)'}</span>
// // // //               </div>
// // // //               <div className="source-stats">
// // // //                 <span className="sessions">{source.sessions} sessions</span>
// // // //                 <span className="duration">{Math.round(source.avgDuration)}s avg</span>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Top Performing Pages */}
// // // //       <div className="chart-card">
// // // //         <h3>Top Performing Pages</h3>
// // // //         <div className="pages-list">
// // // //           {stats.pagePerformance?.map((page, index) => (
// // // //             <div key={index} className="page-item">
// // // //               <div className="page-info">
// // // //                 <span className="page-title">{page.title}</span>
// // // //                 <span className="page-path">{page.path}</span>
// // // //               </div>
// // // //               <div className="page-stats">
// // // //                 <span className="views">{page.views} views</span>
// // // //                 <span className="duration">{page.avgDuration}s</span>
// // // //                 <span className="scroll">{page.avgScrollDepth}% scroll</span>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Geographic Distribution */}
// // // //       <div className="chart-card">
// // // //         <h3>Visitors by Country</h3>
// // // //         <div className="countries-list">
// // // //           {stats.geographicData?.map((country, index) => (
// // // //             <div key={index} className="country-item">
// // // //               <div className="country-flag">🌍</div>
// // // //               <span className="country-name">{country.country}</span>
// // // //               <span className="country-visitors">{country.visitors} visitors</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Device & Browser Stats */}
// // // //       <div className="chart-card">
// // // //         <h3>Device Distribution</h3>
// // // //         <div className="device-stats">
// // // //           {stats.deviceStats?.map((device, index) => (
// // // //             <div key={index} className="device-item">
// // // //               {device.type === 'desktop' && <FaDesktop />}
// // // //               {device.type === 'mobile' && <FaMobile />}
// // // //               {device.type === 'tablet' && <FaTablet />}
// // // //               <span className="device-type">{device.type}</span>
// // // //               <span className="device-percentage">{device.percentage?.toFixed(1)}%</span>
// // // //               <span className="device-sessions">{device.sessions} sessions</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* User Engagement */}
// // // //       <div className="chart-card">
// // // //         <h3>User Engagement</h3>
// // // //         <div className="engagement-stats">
// // // //           <div className="engagement-item">
// // // //             <FaMousePointer />
// // // //             <span>Clicks: {stats.userBehavior?.[0]?.totalClicks?.toLocaleString()}</span>
// // // //           </div>
// // // //           <div className="engagement-item">
// // // //             <FaScroll />
// // // //             <span>Scrolls: {stats.userBehavior?.[0]?.totalScrolls?.toLocaleString()}</span>
// // // //           </div>
// // // //           <div className="engagement-item">
// // // //             <FaFileDownload />
// // // //             <span>Downloads: {stats.userBehavior?.[0]?.totalDownloads?.toLocaleString()}</span>
// // // //           </div>
// // // //           <div className="engagement-item">
// // // //             <FaVideo />
// // // //             <span>Videos: {stats.userBehavior?.[0]?.videosStarted?.toLocaleString()}</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Performance Metrics */}
// // // //       <div className="chart-card">
// // // //         <h3>Performance Metrics</h3>
// // // //         <div className="performance-stats">
// // // //           <div className="performance-item">
// // // //             <FaNetworkWired />
// // // //             <span>LCP: {stats.performance?.largestContentfulPaint?.toFixed(0)}ms</span>
// // // //           </div>
// // // //           <div className="performance-item">
// // // //             <FaChartLine />
// // // //             <span>CLS: {stats.performance?.cumulativeLayoutShift?.toFixed(3)}</span>
// // // //           </div>
// // // //           <div className="performance-item">
// // // //             <FaClock />
// // // //             <span>FID: {stats.performance?.firstInputDelay?.toFixed(0)}ms</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   </>
// // // // );

// // // // const RealTimeDashboard = ({ stats, loading }) => (
// // // //   <div className="realtime-dashboard">
// // // //     <div className="realtime-header">
// // // //       <h2>Real-time Analytics</h2>
// // // //       <div className="last-updated">
// // // //         Last updated: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'Loading...'}
// // // //       </div>
// // // //     </div>

// // // //     <div className="realtime-grid">
// // // //       <StatCard
// // // //         title="Active Visitors"
// // // //         value={stats.activeVisitors?.toLocaleString()}
// // // //         icon={<FaUserClock />}
// // // //         subtitle="Last 5 minutes"
// // // //       />

// // // //       {/* Recent Page Views */}
// // // //       <div className="chart-card full-width">
// // // //         <h3>Recent Page Views</h3>
// // // //         <div className="recent-pages">
// // // //           {stats.recentPageViews?.map((page, index) => (
// // // //             <div key={index} className="recent-page-item">
// // // //               <span className="page-title">{page.title}</span>
// // // //               <span className="page-views">{page.views} views</span>
// // // //               <span className="page-time">{new Date(page.lastView).toLocaleTimeString()}</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Current Events */}
// // // //       <div className="chart-card">
// // // //         <h3>Current Events</h3>
// // // //         <div className="current-events">
// // // //           {stats.currentEvents?.map((event, index) => (
// // // //             <div key={index} className="event-item">
// // // //               <span className="event-name">{event._id}</span>
// // // //               <span className="event-count">{event.count}</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Geographic Distribution */}
// // // //       <div className="chart-card">
// // // //         <h3>Active Visitors by Country</h3>
// // // //         <div className="active-countries">
// // // //           {stats.geographicDistribution?.map((country, index) => (
// // // //             <div key={index} className="active-country-item">
// // // //               <span className="country-name">{country._id}</span>
// // // //               <span className="country-count">{country.count} visitors</span>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // const UserJourneyDashboard = ({ stats }) => (
// // // //   <div className="user-journey-dashboard">
// // // //     <h2>User Journey Analysis</h2>
// // // //     <div className="journey-stats">
// // // //       {stats.map((session, index) => (
// // // //         <div key={index} className="session-journey">
// // // //           <div className="session-header">
// // // //             <span className="session-id">Session: {session.sessionId.slice(0, 8)}...</span>
// // // //             <span className="session-duration">{Math.round(session.totalDuration / 60)}m {session.totalDuration % 60}s</span>
// // // //           </div>
// // // //           <div className="pages-flow">
// // // //             {session.pages?.map((page, pageIndex) => (
// // // //               <div key={pageIndex} className="page-step">
// // // //                 <div className="page-info">
// // // //                   <span className="page-title">{page.title}</span>
// // // //                   <span className="page-duration">{page.duration}s</span>
// // // //                 </div>
// // // //                 {pageIndex < session.pages.length - 1 && <div className="flow-arrow">→</div>}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   </div>
// // // // );

// // // // // Styled Components
// // // // const Wrapper = styled.div`
// // // //   padding: 2rem;
// // // //   background: #f8fafc;
// // // //   min-height: 100vh;

// // // //   .dashboard-header {
// // // //     display: flex;
// // // //     justify-content: space-between;
// // // //     align-items: flex-start;
// // // //     margin-bottom: 2rem;
// // // //     flex-wrap: wrap;
// // // //     gap: 1rem;

// // // //     .header-left {
// // // //       h1 {
// // // //         color: #1a202c;
// // // //         font-size: 2rem;
// // // //         font-weight: 700;
// // // //         margin-bottom: 0.5rem;
// // // //       }

// // // //       p {
// // // //         color: #718096;
// // // //         font-size: 1rem;
// // // //       }
// // // //     }

// // // //     .header-controls {
// // // //       display: flex;
// // // //       gap: 1rem;
// // // //       align-items: center;
// // // //       flex-wrap: wrap;
// // // //     }

// // // //     .time-range-selector select {
// // // //       padding: 0.5rem 1rem;
// // // //       border: 2px solid #e2e8f0;
// // // //       border-radius: 6px;
// // // //       background: white;
// // // //       cursor: pointer;
// // // //     }
// // // //   }

// // // //   .metrics-grid {
// // // //     display: grid;
// // // //     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
// // // //     gap: 1.5rem;
// // // //     margin-bottom: 2rem;
// // // //   }

// // // //   .analytics-grid {
// // // //     display: grid;
// // // //     grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
// // // //     gap: 1.5rem;
// // // //   }

// // // //   .chart-card {
// // // //     background: white;
// // // //     padding: 1.5rem;
// // // //     border-radius: 12px;
// // // //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

// // // //     &.full-width {
// // // //       grid-column: 1 / -1;
// // // //     }

// // // //     h3 {
// // // //       margin-bottom: 1rem;
// // // //       color: #2d3748;
// // // //       font-size: 1.2rem;
// // // //       font-weight: 600;
// // // //     }

// // // //     .sources-list, .pages-list, .countries-list, .device-stats,
// // // //     .engagement-stats, .performance-stats, .recent-pages,
// // // //     .current-events, .active-countries {
// // // //       .source-item, .page-item, .country-item, .device-item,
// // // //       .engagement-item, .performance-item, .recent-page-item,
// // // //       .event-item, .active-country-item {
// // // //         display: flex;
// // // //         justify-content: space-between;
// // // //         align-items: center;
// // // //         padding: 0.75rem 0;
// // // //         border-bottom: 1px solid #e2e8f0;

// // // //         &:last-child {
// // // //           border-bottom: none;
// // // //         }
// // // //       }
// // // //     }

// // // //     .source-info, .page-info {
// // // //       display: flex;
// // // //       flex-direction: column;
// // // //       gap: 0.25rem;

// // // //       .source-name, .page-title {
// // // //         font-weight: 600;
// // // //         color: #2d3748;
// // // //       }

// // // //       .source-medium, .page-path {
// // // //         font-size: 0.8rem;
// // // //         color: #718096;
// // // //       }
// // // //     }

// // // //     .country-flag {
// // // //       margin-right: 0.5rem;
// // // //     }

// // // //     .device-type {
// // // //       text-transform: capitalize;
// // // //       margin: 0 0.5rem;
// // // //     }
// // // //   }

// // // //   .realtime-dashboard {
// // // //     .realtime-header {
// // // //       display: flex;
// // // //       justify-content: space-between;
// // // //       align-items: center;
// // // //       margin-bottom: 2rem;
// // // //     }

// // // //     .realtime-grid {
// // // //       display: grid;
// // // //       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// // // //       gap: 1.5rem;
// // // //     }
// // // //   }

// // // //   .user-journey-dashboard {
// // // //     .session-journey {
// // // //       background: white;
// // // //       padding: 1.5rem;
// // // //       border-radius: 12px;
// // // //       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // // //       margin-bottom: 1rem;

// // // //       .session-header {
// // // //         display: flex;
// // // //         justify-content: space-between;
// // // //         margin-bottom: 1rem;
// // // //         padding-bottom: 0.5rem;
// // // //         border-bottom: 1px solid #e2e8f0;
// // // //       }

// // // //       .pages-flow {
// // // //         display: flex;
// // // //         align-items: center;
// // // //         flex-wrap: wrap;
// // // //         gap: 0.5rem;

// // // //         .page-step {
// // // //           display: flex;
// // // //           align-items: center;
// // // //           gap: 0.5rem;

// // // //           .page-info {
// // // //             background: #edf2f7;
// // // //             padding: 0.5rem 1rem;
// // // //             border-radius: 6px;
// // // //             display: flex;
// // // //             flex-direction: column;
// // // //             gap: 0.25rem;

// // // //             .page-title {
// // // //               font-weight: 500;
// // // //             }

// // // //             .page-duration {
// // // //               font-size: 0.8rem;
// // // //               color: #718096;
// // // //             }
// // // //           }

// // // //           .flow-arrow {
// // // //             color: #a0aec0;
// // // //             font-weight: bold;
// // // //           }
// // // //         }
// // // //       }
// // // //     }
// // // //   }

// // // //   .loading {
// // // //     text-align: center;
// // // //     padding: 3rem;
// // // //     color: #718096;
// // // //     font-size: 1.2rem;
// // // //   }
// // // // `;

// // // // const StatCardWrapper = styled.div`
// // // //   background: white;
// // // //   padding: 1.5rem;
// // // //   border-radius: 12px;
// // // //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // // //   display: flex;
// // // //   align-items: center;
// // // //   gap: 1rem;
// // // //   transition: transform 0.2s ease;

// // // //   &:hover {
// // // //     transform: translateY(-2px);
// // // //   }

// // // //   .stat-icon {
// // // //     background: #e8f4ff;
// // // //     padding: 1rem;
// // // //     border-radius: 10px;
// // // //     color: #2d8cd4;
// // // //     font-size: 1.5rem;
// // // //     display: flex;
// // // //     align-items: center;
// // // //     justify-content: center;
// // // //   }

// // // //   .stat-content {
// // // //     flex: 1;

// // // //     h3 {
// // // //       color: #718096;
// // // //       font-size: 0.9rem;
// // // //       margin-bottom: 0.5rem;
// // // //       text-transform: uppercase;
// // // //       letter-spacing: 0.5px;
// // // //     }

// // // //     .stat-value {
// // // //       color: #1a202c;
// // // //       font-size: 1.5rem;
// // // //       font-weight: 700;
// // // //       margin-bottom: 0.25rem;
// // // //     }

// // // //     .stat-subtitle {
// // // //       color: #a0aec0;
// // // //       font-size: 0.8rem;
// // // //       margin-bottom: 0.25rem;
// // // //     }

// // // //     .stat-change {
// // // //       font-size: 0.8rem;
// // // //       font-weight: 500;

// // // //       &.positive {
// // // //         color: #38a169;
// // // //       }

// // // //       &.negative {
// // // //         color: #e53e3e;
// // // //       }
// // // //     }
// // // //   }
// // // // `;

// // // // const TabsWrapper = styled.div`
// // // //   display: flex;
// // // //   background: #edf2f7;
// // // //   padding: 0.25rem;
// // // //   border-radius: 8px;

// // // //   button {
// // // //     display: flex;
// // // //     align-items: center;
// // // //     gap: 0.5rem;
// // // //     padding: 0.5rem 1rem;
// // // //     border: none;
// // // //     background: transparent;
// // // //     border-radius: 6px;
// // // //     cursor: pointer;
// // // //     transition: all 0.2s ease;
// // // //     font-weight: 500;
// // // //     color: #4a5568;

// // // //     &:hover {
// // // //       background: #e2e8f0;
// // // //     }

// // // //     &.active {
// // // //       background: white;
// // // //       color: #2d3748;
// // // //       box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// // // //     }
// // // //   }
// // // // `;

// // // // export default AnalyticsDashboard;











































// // // // // // components/AnalyticsDashboard.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useAnalytics } from '../context/AnalyticsContext';
// // // // // import styled from 'styled-components';
// // // // // import axios from 'axios';
// // // // // import {
// // // // //   FaUsers,
// // // // //   FaEye,
// // // // //   FaClock,
// // // // //   FaGlobeAmericas,
// // // // //   FaDesktop,
// // // // //   FaMobile,
// // // // //   FaTablet,
// // // // //   FaChartLine
// // // // // } from 'react-icons/fa';

// // // // // const AnalyticsDashboard = () => {
// // // // //   const { trackEvent } = useAnalytics();
// // // // //   const [timeRange, setTimeRange] = useState('7d');
// // // // //   const [stats, setStats] = useState({});
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     loadAnalyticsData();
// // // // //   }, [timeRange]);


  
// // // // //   const loadAnalyticsData = async () => {
// // // // //     try {
// // // // //         setLoading(true);
// // // // //         const response = await axios.get(
// // // // //         `${import.meta.env.VITE_API_BASE_URL}/analytics/dashboard?range=${timeRange}`,
// // // // //         { withCredentials: true }
// // // // //         );
// // // // //         setStats(response.data.data); // Note: response.data.data
// // // // //     } catch (error) {
// // // // //         console.error('Error loading analytics:', error);
// // // // //     } finally {
// // // // //         setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const StatCard = ({ title, value, icon, change, changeType }) => (
// // // // //     <StatCardWrapper>
// // // // //       <div className="stat-icon">{icon}</div>
// // // // //       <div className="stat-content">
// // // // //         <h3>{title}</h3>
// // // // //         <div className="stat-value">{value}</div>
// // // // //         {change && (
// // // // //           <div className={`stat-change ${changeType}`}>
// // // // //             {change}% from previous period
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </StatCardWrapper>
// // // // //   );

// // // // //   if (loading) {
// // // // //     return <div>Loading analytics...</div>;
// // // // //   }

// // // // //   return (
// // // // //     <Wrapper>
// // // // //       <div className="dashboard-header">
// // // // //         <h1>Website Analytics</h1>
// // // // //         <div className="time-range-selector">
// // // // //           <select 
// // // // //             value={timeRange} 
// // // // //             onChange={(e) => setTimeRange(e.target.value)}
// // // // //           >
// // // // //             <option value="1d">Last 24 Hours</option>
// // // // //             <option value="7d">Last 7 Days</option>
// // // // //             <option value="30d">Last 30 Days</option>
// // // // //             <option value="90d">Last 90 Days</option>
// // // // //           </select>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Key Metrics */}
// // // // //       <div className="metrics-grid">
// // // // //         <StatCard
// // // // //           title="Total Visitors"
// // // // //           value={stats.totalVisitors?.toLocaleString()}
// // // // //           icon={<FaUsers />}
// // // // //           change={stats.visitorChange}
// // // // //           changeType={stats.visitorChange > 0 ? 'positive' : 'negative'}
// // // // //         />
// // // // //         <StatCard
// // // // //           title="Page Views"
// // // // //           value={stats.pageViews?.toLocaleString()}
// // // // //           icon={<FaEye />}
// // // // //           change={stats.pageViewChange}
// // // // //           changeType={stats.pageViewChange > 0 ? 'positive' : 'negative'}
// // // // //         />
// // // // //         <StatCard
// // // // //           title="Avg. Session Duration"
// // // // //           value={`${Math.floor(stats.avgSessionDuration / 60)}m ${stats.avgSessionDuration % 60}s`}
// // // // //           icon={<FaClock />}
// // // // //           change={stats.durationChange}
// // // // //           changeType={stats.durationChange > 0 ? 'positive' : 'negative'}
// // // // //         />
// // // // //         <StatCard
// // // // //           title="Bounce Rate"
// // // // //           value={`${stats.bounceRate}%`}
// // // // //           icon={<FaChartLine />}
// // // // //           change={stats.bounceRateChange}
// // // // //           changeType={stats.bounceRateChange < 0 ? 'positive' : 'negative'}
// // // // //         />
// // // // //       </div>

// // // // //       {/* Charts and Detailed Analytics */}
// // // // //       <div className="analytics-grid">
// // // // //         {/* Visitors Chart */}
// // // // //         <div className="chart-card">
// // // // //           <h3>Visitors Over Time</h3>
// // // // //           {/* You can integrate Chart.js or similar here */}
// // // // //           <div className="chart-placeholder">
// // // // //             Visitors chart will be displayed here
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Top Pages */}
// // // // //         <div className="chart-card">
// // // // //           <h3>Top Pages</h3>
// // // // //           <div className="top-pages">
// // // // //             {stats.topPages?.map((page, index) => (
// // // // //               <div key={index} className="page-item">
// // // // //                 <span className="page-title">{page.title}</span>
// // // // //                 <span className="page-views">{page.views} views</span>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Geographic Distribution */}
// // // // //         <div className="chart-card">
// // // // //           <h3>Visitors by Country</h3>
// // // // //           <div className="countries-list">
// // // // //             {stats.topCountries?.map((country, index) => (
// // // // //               <div key={index} className="country-item">
// // // // //                 <span className="country-name">{country.name}</span>
// // // // //                 <span className="country-visitors">{country.visitors} visitors</span>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Device Distribution */}
// // // // //         <div className="chart-card">
// // // // //           <h3>Device Distribution</h3>
// // // // //           <div className="device-stats">
// // // // //             <div className="device-item">
// // // // //               <FaDesktop />
// // // // //               <span>Desktop: {stats.devices?.desktop}%</span>
// // // // //             </div>
// // // // //             <div className="device-item">
// // // // //               <FaMobile />
// // // // //               <span>Mobile: {stats.devices?.mobile}%</span>
// // // // //             </div>
// // // // //             <div className="device-item">
// // // // //               <FaTablet />
// // // // //               <span>Tablet: {stats.devices?.tablet}%</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Wrapper>
// // // // //   );
// // // // // };

// // // // // const Wrapper = styled.div`
// // // // //   padding: 2rem;
// // // // //   background: #f8fafc;
// // // // //   min-height: 100vh;

// // // // //   .dashboard-header {
// // // // //     display: flex;
// // // // //     justify-content: space-between;
// // // // //     align-items: center;
// // // // //     margin-bottom: 2rem;

// // // // //     h1 {
// // // // //       color: #1a202c;
// // // // //       font-size: 2rem;
// // // // //       font-weight: 700;
// // // // //     }

// // // // //     .time-range-selector select {
// // // // //       padding: 0.5rem 1rem;
// // // // //       border: 2px solid #e2e8f0;
// // // // //       border-radius: 6px;
// // // // //       background: white;
// // // // //       cursor: pointer;
// // // // //     }
// // // // //   }

// // // // //   .metrics-grid {
// // // // //     display: grid;
// // // // //     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// // // // //     gap: 1.5rem;
// // // // //     margin-bottom: 2rem;
// // // // //   }

// // // // //   .analytics-grid {
// // // // //     display: grid;
// // // // //     grid-template-columns: 2fr 1fr;
// // // // //     gap: 1.5rem;

// // // // //     @media (max-width: 1024px) {
// // // // //       grid-template-columns: 1fr;
// // // // //     }
// // // // //   }

// // // // //   .chart-card {
// // // // //     background: white;
// // // // //     padding: 1.5rem;
// // // // //     border-radius: 12px;
// // // // //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

// // // // //     h3 {
// // // // //       margin-bottom: 1rem;
// // // // //       color: #2d3748;
// // // // //       font-size: 1.2rem;
// // // // //     }

// // // // //     .chart-placeholder {
// // // // //       height: 200px;
// // // // //       background: #f7fafc;
// // // // //       border-radius: 8px;
// // // // //       display: flex;
// // // // //       align-items: center;
// // // // //       justify-content: center;
// // // // //       color: #718096;
// // // // //     }

// // // // //     .top-pages, .countries-list {
// // // // //       .page-item, .country-item {
// // // // //         display: flex;
// // // // //         justify-content: space-between;
// // // // //         padding: 0.75rem 0;
// // // // //         border-bottom: 1px solid #e2e8f0;

// // // // //         &:last-child {
// // // // //           border-bottom: none;
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     .device-stats {
// // // // //       .device-item {
// // // // //         display: flex;
// // // // //         align-items: center;
// // // // //         gap: 0.5rem;
// // // // //         padding: 0.5rem 0;
// // // // //         color: #4a5568;
// // // // //       }
// // // // //     }
// // // // //   }
// // // // // `;

// // // // // const StatCardWrapper = styled.div`
// // // // //   background: white;
// // // // //   padding: 1.5rem;
// // // // //   border-radius: 12px;
// // // // //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // // // //   display: flex;
// // // // //   align-items: center;
// // // // //   gap: 1rem;

// // // // //   .stat-icon {
// // // // //     background: #e8f4ff;
// // // // //     padding: 1rem;
// // // // //     border-radius: 10px;
// // // // //     color: #2d8cd4;
// // // // //     font-size: 1.5rem;
// // // // //   }

// // // // //   .stat-content {
// // // // //     h3 {
// // // // //       color: #718096;
// // // // //       font-size: 0.9rem;
// // // // //       margin-bottom: 0.5rem;
// // // // //       text-transform: uppercase;
// // // // //       letter-spacing: 0.5px;
// // // // //     }

// // // // //     .stat-value {
// // // // //       color: #1a202c;
// // // // //       font-size: 1.5rem;
// // // // //       font-weight: 700;
// // // // //       margin-bottom: 0.25rem;
// // // // //     }

// // // // //     .stat-change {
// // // // //       font-size: 0.8rem;

// // // // //       &.positive {
// // // // //         color: #38a169;
// // // // //       }

// // // // //       &.negative {
// // // // //         color: #e53e3e;
// // // // //       }
// // // // //     }
// // // // //   }
// // // // // `;

// // // // // export default AnalyticsDashboard;


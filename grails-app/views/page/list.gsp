
<%@ page import="com.zcarioca.website.Page" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'page.label', default: 'Page')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <div class="list">
                <table>
                    <thead>
                        <tr>
                        
                            <g:sortableColumn property="id" title="${message(code: 'page.id.label', default: 'Id')}" />
                        
                            <g:sortableColumn property="title" title="${message(code: 'page.title.label', default: 'Title')}" />
                        
                            <g:sortableColumn property="content" title="${message(code: 'page.content.label', default: 'Content')}" />
                        
                            <g:sortableColumn property="pageOrder" title="${message(code: 'page.pageOrder.label', default: 'Page Order')}" />
                        
                            <g:sortableColumn property="dateAdded" title="${message(code: 'page.dateAdded.label', default: 'Date Added')}" />
                        
                            <g:sortableColumn property="dateModified" title="${message(code: 'page.dateModified.label', default: 'Date Modified')}" />
                        
                        </tr>
                    </thead>
                    <tbody>
                    <g:each in="${pageInstanceList}" status="i" var="pageInstance">
                        <tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
                        
                            <td><g:link action="show" id="${pageInstance.id}">${fieldValue(bean: pageInstance, field: "id")}</g:link></td>
                        
                            <td>${fieldValue(bean: pageInstance, field: "title")}</td>
                        
                            <td>${fieldValue(bean: pageInstance, field: "content")}</td>
                        
                            <td>${fieldValue(bean: pageInstance, field: "pageOrder")}</td>
                        
                            <td><g:formatDate date="${pageInstance.dateAdded}" /></td>
                        
                            <td><g:formatDate date="${pageInstance.dateModified}" /></td>
                        
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
            <div class="paginateButtons">
                <g:paginate total="${pageInstanceTotal}" />
            </div>
        </div>
    </body>
</html>

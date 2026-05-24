(function () {
  const data = window.PORTFOLIO_DATA;

  if (!data) {
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const isProjectPage = document.body.classList.contains("project-page");
  const pagePrefix = isProjectPage ? "../../" : "./";

  const createElement = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (typeof text === "string") {
      el.textContent = text;
    }
    return el;
  };

  const resolveHref = (href) => {
    if (!href) {
      return href;
    }

    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return href;
    }

    if (href.startsWith("/")) {
      return `${pagePrefix}${href.slice(1)}`;
    }

    return `${pagePrefix}${href}`;
  };

  const renderLinks = (container, items) => {
    if (!items || !items.length) {
      return;
    }

    const list = createElement("div", "artifact-links");
    items.forEach((item) => {
      const link = createElement("a", "artifact-link", item.label);
      link.href = resolveHref(item.href);
      link.target = "_blank";
      link.rel = "noreferrer";
      list.append(link);
    });
    container.append(list);
  };

  const renderArtifactCards = (target, items) => {
    if (!target || !items || !items.length) {
      return;
    }

    items.forEach((item) => {
      const card = createElement("article", "artifact-card");
      card.setAttribute("data-reveal", "");

      if (item.image) {
        const figure = createElement("div", "artifact-figure");
        const image = document.createElement("img");
        image.src = resolveHref(item.image);
        image.alt = item.title;
        figure.append(image);
        card.append(figure);
      }

      card.append(createElement("h3", "", item.title));
      card.append(createElement("p", "", item.description));

      if (item.note) {
        card.append(createElement("p", "artifact-note", item.note));
      }

      if (item.quote) {
        card.append(createElement("blockquote", "artifact-quote", item.quote));
      }

      renderLinks(card, item.links);
      target.append(card);
    });
  };

  const renderHome = () => {
    const {
      profile,
      proofs,
      fit,
      companyAngles,
      capabilities,
      experiences,
      evidence,
      materials,
      about,
      contact,
      projects
    } = data;

    $("#hero-role").textContent = profile.role;
    const heroTitle = $("#hero-title");
    if (profile.name && profile.titlePrefix) {
      heroTitle.textContent = "";
      heroTitle.append(document.createTextNode(`${profile.titlePrefix} `));
      heroTitle.append(createElement("span", "hero-name", profile.name));
    } else {
      heroTitle.textContent = profile.title;
    }
    const personalAvatar = $("#personal-avatar");
    if (personalAvatar) {
      personalAvatar.textContent = profile.avatarName || profile.name || "";
    }
    if (profile.title) {
      const titleNote = createElement("p", "hero-title-note", profile.title);
      $("#hero-summary").parentNode.insertBefore(titleNote, $("#hero-summary"));
    }
    $("#hero-summary").textContent = profile.summary;
    const heroDiff = $("#hero-difference");
    if (profile.difference) {
      heroDiff.textContent = profile.difference;
    } else {
      heroDiff.style.display = "none";
    }
    $("#hero-primary-cta").textContent = profile.primaryCta;
    $("#hero-secondary-cta").textContent = profile.secondaryCta;

    // 渲染技能标签
    if (profile.skills && profile.skills.length) {
      const skillsSection = createElement("div", "hero-skills");
      profile.skills.forEach((group) => {
        const groupEl = createElement("div", "skill-group");
        groupEl.append(createElement("span", "skill-category", group.category));
        const tagsEl = createElement("div", "skill-tags");
        group.items.forEach((tag) => {
          tagsEl.append(createElement("span", "skill-tag", tag));
        });
        groupEl.append(tagsEl);
        skillsSection.append(groupEl);
      });
      const heroActions = $(".hero-actions");
      heroActions.parentNode.insertBefore(skillsSection, heroActions);
    }
    $("#panel-target").textContent = profile.target;
    $("#panel-focus").textContent = profile.focus;
    $("#panel-method").textContent = profile.method;
    $("#contact-intro").textContent = contact.intro;
    $("#footer-note").textContent = profile.footerNote;

    const proofGrid = $("#proof-grid");
    proofs.forEach((item) => {
      const card = createElement("article", "proof-item");
      card.setAttribute("data-reveal", "");
      card.append(createElement("span", "", item.label));
      card.append(createElement("strong", "", item.value));
      if (item.note) {
        card.append(createElement("small", "", item.note));
      }
      proofGrid.append(card);
    });

    const fitGrid = $("#fit-grid");
    if (fitGrid && fit && fit.length) {
      fit.forEach((item) => {
        const card = createElement("article", "fit-card");
        card.setAttribute("data-reveal", "");
        card.append(createElement("span", "fit-label", item.label));
        card.append(createElement("h3", "", item.title));
        card.append(createElement("p", "", item.description));
        fitGrid.append(card);
      });
    }

    const companyGrid = $("#company-grid");
    if (companyGrid && companyAngles && companyAngles.length) {
      companyAngles.forEach((item) => {
        const card = createElement("article", "company-card");
        card.setAttribute("data-reveal", "");
        card.append(createElement("span", "company-label", item.label));
        card.append(createElement("h3", "", item.title));
        card.append(createElement("p", "", item.description));

        const list = createElement("ul", "detail-list company-proof-list");
        item.proofs.forEach((proof) => {
          list.append(createElement("li", "", proof));
        });
        card.append(list);
        companyGrid.append(card);
      });
    }

    const projectGrid = $("#project-grid");
    projects.forEach((project) => {
      const card = createElement("article", "project-card");
      card.setAttribute("data-reveal", "");

      const head = createElement("div", "project-card-head");
      const tag = createElement("span", "project-tag", project.type);
      const result = createElement("span", "result-badge", project.cardResult);
      head.append(tag, result);

      const title = createElement("h3", "", project.title);
      const summary = createElement("p", "", project.cardSummary);
      if (project.contributionBoundary) {
        const boundary = createElement("p", "project-boundary", project.contributionBoundary);
        card.append(head, title, summary, boundary);
      } else {
        card.append(head, title, summary);
      }
      const meta = createElement("div", "project-meta");
      [
        ["角色", project.role],
        ["场景", project.audience],
        ["材料", `${project.artifacts ? project.artifacts.length : 0} 组可验证材料`]
      ].forEach(([label, value]) => {
        const metaItem = createElement("span", "project-meta-item");
        metaItem.append(createElement("b", "", label));
        metaItem.append(createElement("em", "", value));
        meta.append(metaItem);
      });

      if (project.cardSnapshot && project.cardSnapshot.length) {
        const snapshot = createElement("div", "project-snapshot");
        project.cardSnapshot.forEach((item) => {
          const row = createElement("div", "snapshot-row");
          row.append(createElement("span", "", item.label));
          row.append(createElement("strong", "", item.value));
          snapshot.append(row);
        });
        card.append(snapshot);
      }

      const highlights = createElement("ul", "detail-list");
      project.highlights.forEach((item) => {
        highlights.append(createElement("li", "", item));
      });

      const link = createElement("a", "project-link", "查看详情");
      link.href = `projects/${project.slug}/`;

      card.append(meta, highlights, link);
      projectGrid.append(card);
    });

    const capabilityGrid = $("#capability-grid");
    capabilities.forEach((item) => {
      const card = createElement("article", "capability-card");
      card.setAttribute("data-reveal", "");
      card.append(createElement("h3", "", item.title));
      card.append(createElement("p", "", item.description));
      capabilityGrid.append(card);
    });

    const experienceList = $("#experience-list");
    experiences.forEach((item) => {
      const article = createElement("article", "timeline-item");
      article.setAttribute("data-reveal", "");

      const headingGroup = createElement("div", "timeline-copy");
      headingGroup.append(createElement("span", "timeline-tag", item.tag));
      headingGroup.append(createElement("h3", "", `${item.company}｜${item.role}`));
      if (item.period) {
        headingGroup.append(createElement("p", "timeline-meta", item.period));
      }

      article.append(headingGroup);

      const list = createElement("ul");
      item.bullets.forEach((bullet) => {
        list.append(createElement("li", "", bullet));
      });

      article.append(list);
      experienceList.append(article);
    });

    const evidenceGrid = $("#evidence-grid");
    evidence.forEach((item) => {
      const card = createElement("article", "evidence-card");
      card.setAttribute("data-reveal", "");
      card.append(createElement("h3", "", item.title));
      card.append(createElement("p", "", item.description));
      evidenceGrid.append(card);
    });

    renderArtifactCards($("#material-grid"), materials);

    const aboutCopy = $("#about-copy");
    about.forEach((paragraph) => {
      aboutCopy.append(createElement("p", "", paragraph));
    });

    const contactList = $("#contact-list");
    if (contact.fit && contact.fit.length) {
      const fitList = createElement("div", "contact-fit-list");
      contact.fit.forEach((item) => {
        const fitItem = createElement("div", "contact-fit-item");
        fitItem.append(createElement("span", "", item.label));
        fitItem.append(createElement("strong", "", item.value));
        fitList.append(fitItem);
      });
      contactList.append(fitList);
    }

    contact.items.forEach((item) => {
      const wrapper = createElement("div", "contact-item");
      wrapper.append(createElement("span", "", item.label));

      if (item.type === "link") {
        const link = createElement("a", "", item.value);
        link.href = item.href;
        wrapper.append(link);
      } else {
        wrapper.append(createElement("strong", "", item.value));
      }

      contactList.append(wrapper);
    });

    if (contact.prompt) {
      contactList.append(createElement("p", "contact-prompt", contact.prompt));
    }
  };

  const renderProject = () => {
    const slug = document.body.dataset.project;
    const project = data.projects.find((entry) => entry.slug === slug);

    if (!project) {
      return;
    }

    document.title = `${project.title}｜用户运营 / 内容运营作品集`;

    $("#project-type").textContent = project.type;
    $("#project-title").textContent = project.title;
    $("#project-summary").textContent = project.cardSummary;
    $("#project-badge").textContent = project.cardResult;
    $("#project-intro").textContent = "我把这个案例拆成了问题、动作、结果、材料和复盘五层，方便招聘方快速定位我真正负责的部分。";
    $("#project-reflection").textContent = project.reflection;
    $("#project-contact-email").href = "mailto:2097841402@qq.com";

    const summaryGrid = $("#summary-metrics");
    [
      ["项目角色", project.role],
      ["项目场景", project.audience],
      ["项目类型", project.type],
      ["核心结果", project.cardResult]
    ].forEach(([label, value]) => {
      const item = createElement("div", "summary-metric");
      item.append(createElement("span", "", label));
      item.append(createElement("strong", "", value));
      summaryGrid.append(item);
    });

    $("#challenge-copy").textContent = project.challenge;

    const constraintList = $("#constraint-list");
    project.constraints.forEach((item) => {
      constraintList.append(createElement("li", "", item));
    });

    const contributionList = $("#contribution-list");
    project.contributions.forEach((item) => {
      contributionList.append(createElement("li", "", item));
    });

    const processGrid = $("#process-grid");
    project.process.forEach((item) => {
      const card = createElement("article", "process-card");
      card.setAttribute("data-reveal", "");
      card.append(createElement("h3", "", item.title));
      card.append(createElement("p", "", item.description));
      processGrid.append(card);
    });

    const outcomeGrid = $("#outcome-grid");
    project.outcomes.forEach((item) => {
      const card = createElement("article", "outcome-card");
      card.setAttribute("data-reveal", "");
      card.append(createElement("h3", "", item.label));
      card.append(createElement("p", "", item.value));
      outcomeGrid.append(card);
    });

    renderArtifactCards($("#project-artifact-grid"), project.artifacts);

    const related = data.projects.filter((entry) => entry.slug !== slug).slice(0, 2);
    const relatedGrid = $("#related-grid");
    related.forEach((item) => {
      const card = createElement("article", "related-card");
      card.setAttribute("data-reveal", "");
      card.append(createElement("h3", "", item.title));
      card.append(createElement("p", "", item.cardSummary));
      const link = createElement("a", "text-link", "继续阅读");
      link.href = `../${item.slug}/`;
      card.append(link);
      relatedGrid.append(card);
    });
  };

  const initReveal = () => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
  };

  if (document.body.classList.contains("home-page")) {
    renderHome();
  }

  if (document.body.classList.contains("project-page")) {
    renderProject();
  }

  initReveal();
})();
